import asyncio
from Services.notebooklm_services import NotebookLMService

async def main():
    service = NotebookLMService()

    result = await service.generate_lesson_flashcards(
        lessons=[{
                "title": "Try...Except",
                "description": "In this lesson, we will learn about error handling in Python and how to use it.",
                "content": [
                    {
                        "id": "l15_1",
                        "type": "text",
                        "value": "When an error occurs, Python will normally stop and generate an error message. Exceptions can be handled using the try and except blocks. The try block lets you test a block of code for errors. The except block lets you handle the error."
                    },
                    {
                        "id": "l15_2",
                        "type": "text",
                        "value": "Exception Handling"
                    },
                    {
                        "id": "l15_3",
                        "type": "text",
                        "value": "In this example the try block will generate an exception, because x is not defined. Since an exception occurs in the try block, the except block is executed. Without this try block, the program would crash and raise an error."
                    },
                    {
                        "id": "l15_4",
                        "type": "example",
                        "value": "try:\n    print(x)\nexcept:\n    print(\"An exception occurred!\")"
                    },
                    {
                        "id": "l15_5",
                        "type": "text",
                        "value": "Many Exceptions"
                    },
                    {
                        "id": "l15_6",
                        "type": "text",
                        "value": "You can define as many exception blocks as you want. This is useful when you want to handle different types of errors in different ways."
                    },
                    {
                        "id": "l15_7",
                        "type": "example",
                        "value": "try:\n    print(x)\nexcept NameError:\n    print(\"The variable is not defined!\")\nexcept:\n    print(\"Unknown error occurred!\")"
                    },
                    {
                        "id": "l15_8",
                        "type": "text",
                        "value": "Error Message"
                    },
                    {
                        "id": "l15_9",
                        "type": "text",
                        "value": "Exception as e stores the exception in the variable e. This allows you to print the actual error message."
                    },
                    {
                        "id": "l15_10",
                        "type": "example",
                        "value": "try:\n    print(x)\nexcept Exception as e:\n    print(e)"
                    },
                    {
                        "id": "l15_11",
                        "type": "text",
                        "value": "Raise an Exception"
                    },
                    {
                        "id": "l15_12",
                        "type": "text",
                        "value": "In Python, you can choose to raise an exception when a certain condition occurs. To throw an exception, use the raise keyword."
                    },
                    {
                        "id": "l15_13",
                        "type": "text",
                        "value": "In this example, an exception is raised when age is negative."
                    },
                    {
                        "id": "l15_14",
                        "type": "example",
                        "value": "age = -12\nif age < 0:\n    raise Exception(\"Age can't be negative!\")"
                    },
                    {
                        "id": "l15_17",
                        "type": "text",
                        "value": "Note:"
                    },
                    {
                        "id": "l15_18",
                        "type": "note",
                        "value": "The code inside a try...except block must be indented."
                    },
                    {
                        "id": "l15_19",
                        "type": "note",
                        "value": "Use try...except when an error might occur during program execution and you want to prevent the program from crashing."
                    },
                    {
                        "id": "l15_20",
                        "type": "note",
                        "value": "Python also provides a finally block, which is always executed regardless if the try block raises an error or not."
                    },
                    {
                        "id": "l15_21",
                        "type": "note",
                        "value": "The try block cannot be used without an except block."
                    }
                ]

            }]
        )
    print("\n\n\n", "flashcards generation result: ", result, "\n\n\n")

if __name__ == "__main__":
    asyncio.run(main())