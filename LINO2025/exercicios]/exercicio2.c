#include<stdio.h>

int main(){
//variaveis
char letra1;
char letra2;
char letra3;

//inicio
printf("Digite a letra1: \n");
scanf(" %c",&letra1);
printf("Digite a letra2: \n"); 
scanf(" %c",&letra2);
printf("Digite a letra3: \n");
scanf(" %c",&letra3);
//final do sistema
printf("A palavra que for formada deixe ela inversa: %c-%c-%C \n", letra3, letra2, letra1);
}