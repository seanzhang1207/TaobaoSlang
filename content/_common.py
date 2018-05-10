from pypinyin import lazy_pinyin, Style


def latin(word):
    return ''.join(lazy_pinyin(word, style=Style.NORMAL)).lower()


def latinhead(word):
    return ''.join(lazy_pinyin(word[0], style=Style.TONE2)).lower()


def pinyin(word):
    return ' '.join(lazy_pinyin(word, style=Style.TONE, errors='ignore'))


class DictionaryEntry:
    name = None
    explanation = None
    same = None
    close = None
    usage = None
    source = None
    etymology = None
    synonym = None
    similar = None

    def __init__(self,
                 entrytext,
                 explanation,
                 same,
                 close,
                 usage,
                 construction,
                 source,
                 commonsource):
        self.id = None
        self.name = entrytext
        self.latin = latin(entrytext)
        self.pinyin = pinyin(entrytext)
        self.s_explanation = explanation
        self.s_same = same
        self.s_close = close.split(' ') if close else None
        self.s_usage = usage.split(' ') if usage else None
        self.s_construction = construction.split(' ') if construction else None
        self.s_source = source.split(' ') if source else None
        self.s_commonsource = commonsource.split(' ') if commonsource else None

    def __repr__(self):
        return "<DictionaryEntry \"%s\">" % (self.name)


class Dictionary:
    entries = []

    def add(self, entry):
        if self.get(entry.name) is None:
            self.entries.append(entry)
            self.entries.sort(key=lambda x: latinhead(x.name))
            for i, entry in enumerate(self.entries):
                entry.id = i

    def query(self, **kwargs):
        results = set(self.entries)
        sets = {}

        for pname, satisfies in kwargs.items():
            sets[pname] = set()
            for entry in self.entries:
                if satisfies(getattr(entry, pname)):
                    sets[pname].add(entry)

        for s in sets.values():
            results = results.intersection(s)

        return results

    def get(self, name):
        for entry in self.entries:
            if entry.name == name:
                return entry
        return None
