from openpyxl import load_workbook

from _common import Dictionary, DictionaryEntry


def ParseXLSX(path):
    dictionary = Dictionary()

    wb = load_workbook(path)
    ws = wb[wb.sheetnames[0]]

    for row in ws.rows:
        entry = DictionaryEntry(row[0].value,
                                explanation=row[1].value,
                                same=row[2].value,
                                close=row[3].value,
                                usage=row[4].value,
                                construction=row[5].value,
                                source=row[6].value,
                                commonsource=row[7].value)
        dictionary.add(entry)

    return dictionary
