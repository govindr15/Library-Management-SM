"""
Homework 4
Name: Govind Radhakrishnan Nair
CWID: 10475825
"""

def primeOrNot(myDict:dict)-> None:
    """
    This function checks if the values in myDict are prime or not. If a prime number is found, 
    the program prints a text message including the corresponding key of the prime number.
    """
    result:dict={}
    for key in myDict:
        prime:bool=True
        if(myDict[key]==1):
            continue
        for i in range(2,myDict[key]):
            if(myDict[key]%i==0):
                prime=False

        if(prime==True):
            result.update({key:myDict[key]})

    for key in result:
        print(str(key)+" : "+str(myDict[key])+" is a prime number.")
    

def fibonacci(n:int)->int:
    """
    This function takes in the desired term in the Fibonacci sequence and return the appropriate number.
    """
    a:int=0
    b:int=1
    result:list=[]
    if(n==0 or n==1):
        return b
    elif(n==2):
        return b
    else:
        c:int=a+b
        result.append(b)
        result.append(c)
        a=b
        b=c
        count:int=2
        while(count<n):
            c=a+b
            result.append(c)
            a=b
            b=c
            count=count+1
    return result[n-1]

def expo(a:int,n:int)->int:
    """
    This function returns the result of raising a number to a given power.
    """
    prod:int=1
    for i in range(n):
        prod=prod*a
    return prod

myDict = {"A": 11, "B": 4, "C": 7, "D": 15, "E": 1}
primeOrNot(myDict)


print(fibonacci(4))

print(expo(2,6))