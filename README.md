# TaobaoSlang

## Dependencies
openpyxl
pypinyin

## Usage
To generate full dictionary text data into output.json:
```
usage: main.py [-h] xlsx_file

Generates content of slang dictionary. Follows three steps:
1. Parse the input xlsx file to construct entries. See parse_xlsx.py.
2. Trace entries to generate dynamic content. See trace_entries.py.
3. Format entries to generate final text. See gen_text.py

positional arguments:
  xlsx_file

optional arguments:
  -h, --help  show this help message and exit
```