def GenerateExplanations(dictionary):
    expls = dictionary.query(s_explanation=lambda x: x is not None)
    for entry in expls:
        entry.explanation = entry.s_explanation

        def samemeaning(x):
            if x:
                return entry.name in x

        sames = dictionary.query(s_same=samemeaning)
        for e in sames:
            e.explanation = entry.s_explanation
    return dictionary


def GenerateSameMeanings(dictionary):
    expls = dictionary.query(s_explanation=lambda x: x is not None)
    for entry in expls:

        def samemeaning(x):
            if x:
                return entry.name in x

        sames = dictionary.query(s_same=samemeaning)
        allsamenames = [e.name for e in sames]
        allsamenames.append(entry.name)
        for e in sames:
            e.same = allsamenames[:]
            e.same.remove(e.name)
        entry.same = allsamenames[:]
        entry.same.remove(entry.name)
    return dictionary


def GenerateCloseMeanings(dictionary):
    return dictionary


def GenerateUsage(dictionary):
    return dictionary


def GenerateSources(dictionary):
    def recursiveref(names, level):
        result = []
        for name in names:
            entry = dictionary.get(name)
            if entry and entry.s_commonsource:
                for i in range(len(entry.s_construction)):
                    temp = [entry.s_construction[i], entry.s_commonsource[i], level, True]
                    if temp[:2] not in [entry[:2] for entry in result]:
                        result.append(temp)
            elif entry and entry.s_source:
                for i in range(len(entry.s_construction)):
                    temp = [entry.s_construction[i], entry.s_source[i], level, False]
                    if temp[:2] not in [entry[:2] for entry in result]:
                        result.append(temp)
                result += recursiveref(entry.s_source, level + 1)
        return result

    for index, entry in enumerate(dictionary.entries):
        if entry.s_source:
            entry.source = []
            for i in range(len(entry.s_construction)):
                temp = [entry.s_construction[i], entry.s_source[i], 0, False]
                entry.source.append(temp)
            entry.source += recursiveref(entry.s_source, 1)

        elif entry.s_commonsource:
            entry.source = []
            for i in range(len(entry.s_construction)):
                temp = [entry.s_construction[i], entry.s_commonsource[i], 0, True]
                entry.source.append(temp)

        # print(index, entry, entry.source)

    return dictionary


def GenerateDynamicContent(dictionary):
    dictionary = GenerateSameMeanings(dictionary)
    dictionary = GenerateCloseMeanings(dictionary)
    dictionary = GenerateUsage(dictionary)
    dictionary = GenerateExplanations(dictionary)
    dictionary = GenerateSources(dictionary)
    return dictionary
