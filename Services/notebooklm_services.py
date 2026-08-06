""" import subprocess """
from notebooklm import NotebookLMClient, QuizDifficulty, QuizQuantity
from Services.lesson_exporter import LessonExporter
import os
from dotenv import load_dotenv
import json
load_dotenv()


class NotebookLMService:

    def __init__(self):
        self.notebook_id = os.getenv('NOTEBOOKLM_NOTEBOOK_ID')

        if not self.notebook_id:
            raise ValueError("Environment variable not set correctly (NOTEBOOKLM_NOTEBOOK_ID).")

    async def list_notebooks(self):
        try:
            async with NotebookLMClient.from_storage() as client:
                notebooks = await client.notebooks.list()
                return notebooks
        except Exception as e:
            raise Exception(f"Failed to list notebooks: {e}")

    async def add_source(self, file_path):
        try:
            async with NotebookLMClient.from_storage() as client:
                added_source = await client.sources.add_file(notebook_id=self.notebook_id,
                                                            file_path=file_path)
                await client.sources.wait_until_ready(notebook_id=self.notebook_id,
                                                    source_id=added_source.id)
                return added_source
        except Exception as e:
            raise Exception(f"Failed to add source: {e}")

    async def delete_source(self, source_id):
        try:
            async with NotebookLMClient.from_storage() as client:
                await client.sources.delete(notebook_id=self.notebook_id,
                                                            source_id=source_id)
        except Exception as e:
            raise Exception(f"Failed to delete source: {e}")
        
    async def generate_flashcards(self, source_ids):
        try:
            async with NotebookLMClient.from_storage() as client:
                generated_flashcards = await client.artifacts.generate_flashcards(notebook_id=self.notebook_id,
                                                                                source_ids=source_ids,
                                                                                quantity=QuizQuantity.FEWER,
                                                                                difficulty=QuizDifficulty.EASY)
                await client.artifacts.wait_for_completion(notebook_id=self.notebook_id,
                                                        task_id=generated_flashcards.task_id)
                return generated_flashcards
        except Exception as e:
            raise Exception(f"Failed to generate flashcards: {e}")

    async def generate_quiz(self, source_ids):
        try:
            async with NotebookLMClient.from_storage() as client:
                generated_quiz = await client.artifacts.generate_quiz(notebook_id=self.notebook_id,
                                                                                source_ids=source_ids,
                                                                                quantity=QuizQuantity.STANDARD,
                                                                                difficulty=QuizDifficulty.EASY)
                await client.artifacts.wait_for_completion(notebook_id=self.notebook_id,
                                                        task_id=generated_quiz.task_id)
                return generated_quiz
        except Exception as e:
            raise Exception(f"Failed to generate quiz: {e}")

    async def download_flashcards(self, task_id):
        try:
            async with NotebookLMClient.from_storage() as client:
                result = await client.artifacts.wait_for_completion(notebook_id=self.notebook_id,
                                                                    task_id=task_id)
                print(f"Downloaded flashcards: {result}")

                downloaded_artifact = await client.artifacts.download_flashcards(notebook_id=self.notebook_id,
                                                                                output_path="./Data/TestArtifact/downloaded_flashcards.json")

                with open(
                    "./Data/TestArtifact/downloaded_flashcards.json",
                    "r",
                    encoding="utf-8"
                ) as f:
                    flashcards = json.load(f)

                return flashcards
        except Exception as e:
            raise Exception(f"Failed to download artifact (flashcards): {e}")

    async def download_quiz(self, task_id):
            try:
                async with NotebookLMClient.from_storage() as client:
                    result = await client.artifacts.wait_for_completion(notebook_id=self.notebook_id,
                                                                        task_id=task_id)
                    print(f"Downloaded quiz: {result}")

                    downloaded_artifact = await client.artifacts.download_quiz(notebook_id=self.notebook_id,
                                                                            output_path="./Data/TestArtifact/downloaded_quiz.json")

                    with open(
                        "./Data/TestArtifact/downloaded_quiz.json",
                        "r",
                        encoding="utf-8"
                    ) as f:
                        quiz = json.load(f)
                    
                    return quiz
            except Exception as e:
                raise Exception(f"Failed to download artifact (quiz): {e}")


    async def generate_lesson_flashcards(self, lessons: list):
        source_ids_list = []
        try:
            for lesson in lessons:
                txt_path = LessonExporter.export(lesson)
                source = await self.add_source(txt_path)
                source_ids_list.append(source.id)
                print(f"\n\n\nAdded source inside generate_lesson_flashchards: {source}\n\n\n")
                print(type(source))
            artifact = await self.generate_flashcards(source_ids_list)
            print(f"\n\n\nGenerated artifact inside generate_lesson_flashchards: {artifact}\n\n\n")
            print(type(artifact))
            flashcards = await self.download_flashcards(artifact.task_id)
            return flashcards 

        finally:
            for item in source_ids_list:
                try:
                    await self.delete_source(item)
                except Exception:
                    pass


    async def generate_lesson_quiz(self, lessons: list):
        source_ids_list = []
        try:
            for lesson in lessons:
                txt_path = LessonExporter.export(lesson)
                source = await self.add_source(txt_path)
                source_ids_list.append(source.id)
                print(f"\n\n\nAdded source inside generate_lesson_quiz: {source}\n\n\n")
                print(type(source))
            artifact = await self.generate_quiz(source_ids_list)
            print(f"\n\n\nGenerated artifact inside generate_lesson_quiz: {artifact}\n\n\n")
            print(type(artifact))
            quiz = await self.download_quiz(artifact.task_id)
            return quiz
        finally:
            for item in source_ids_list:
                try:
                    await self.delete_source(item)
                except Exception:
                    pass