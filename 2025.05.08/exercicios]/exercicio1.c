#include <stdio.h>

int main(){
    //variaveis
    float Velocidade;
    float distancia,tempo;

    //inicio
    printf("Informe a distancia percorrida");
    scanf("%f",&distancia);
    printf("Informe o tempo percorrido");
    scanf("%f",&tempo);
    //formula
    Velocidade = distancia/tempo;
    //resultado da formula
    printf("A velocidade foi: %f",Velocidade);

     
}