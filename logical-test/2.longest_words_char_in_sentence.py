def longest_word(sentence):
    kata = sentence.split()    
    longest = max(kata, key=len)    
    return longest, len(longest)

sentence = "Saya sangat senang mengerjakan soal algoritma"
longest_word, length = longest_word(sentence)
print(f"{longest_word}: {length} characters")
