def diagonal_difference(matrix):
    n = len(matrix)
    sum_diagonal1 = 0
    sum_diagonal2 = 0
    for i in range(n):
        sum_diagonal1 += matrix[i][i]          
        sum_diagonal2 += matrix[i][n - i - 1]  
    
    return sum_diagonal1 - sum_diagonal2

matrix = [[1, 2, 0], [4, 5, 6], [7, 8, 9]]
result = diagonal_difference(matrix)
print(result) 
