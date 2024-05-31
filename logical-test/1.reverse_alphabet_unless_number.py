def reverse_alphabets(input_str):
    # Memisahkan number dan karakter
    karakter = [char for char in input_str if char.isalpha()]
    numbers = [(index, char) for index, char in enumerate(input_str) if char.isdigit()]
    
    # Reverse karakter
    reversed_karakter = karakter[::-1]
    
    result = []
    karakter_index = 0
    for index, char in enumerate(input_str):
        if char.isalpha():
            result.append(reversed_karakter[karakter_index])
            karakter_index += 1
        else:
            result.append(char)
    
    return ''.join(result)


input_str = "NEGIE1"
output_str = reverse_alphabets(input_str)
print(output_str)
