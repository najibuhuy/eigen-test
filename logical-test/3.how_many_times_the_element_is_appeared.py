def hitung_kemunculan(input_list, query_list):
    count_dict = {}
    for item in input_list:
        if item in count_dict:
            count_dict[item] += 1
        else:
            count_dict[item] = 1

    result = [count_dict.get(query, 0) for query in query_list]
    
    return result

INPUT = ['xc', 'dz', 'bbb', 'dz']
QUERY = ['bbb', 'ac', 'dz']

output = hitung_kemunculan(INPUT, QUERY)
print(output)  
