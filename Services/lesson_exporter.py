import json
import tempfile

class LessonExporter:

    @staticmethod
    def export(lesson):
        temp = tempfile.NamedTemporaryFile(
            delete=False,
            suffix=".txt",
            mode="w",
            encoding="utf-8"
        )

        json.dump(
            lesson["content"],
            temp,
            indent=4,
            ensure_ascii=False
        )

        temp.close()
        print(f"\n\n\n{temp.name}\n\n\n")
        return temp.name