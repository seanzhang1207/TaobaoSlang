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
        self.name = entrytext
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
        self.entries.append(entry)

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
