num1 = input("Please enter the first number:  ")
  
operation = input("+, -, x, or /:    ").lower()

if operation == "+":

    num2 = input("Please enter the second number:  ")

    answer = float(num1) + float(num2)

    print(answer)

elif operation == "-":

    num2 = input("Please enter the second number:  ")

    answer = float(num1) - float(num2)

    print(answer)
    
elif operation == "x":

    num2 = input("Please enter the second number:  ")
    
    answer = float(num1) * float(num2)

    print(answer)
    
elif operation == "/":
    
    num2 = input("Please enter the second number:  ")

    answer = float(num1) / float(num2)

    print(answer)
    
else:
    print("Invalid choice.")
