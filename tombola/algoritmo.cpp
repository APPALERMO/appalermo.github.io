//Algorimo di Knuth
#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;
#define DIM 3
int main(){
    int i, VSize;//contatore e grandezza vettore
    int v[DIM];
    int vettore[DIM];
    char risposta;

    srand(time(NULL));

    VSize = DIM - 1;
    //inizializziamo array con ciclo
    for(i = 0; i < DIM; i++){
		v[i] = -i + DIM;
	}
	
	for(i = 0; i < DIM; i++)cout<<v[i]<<"\t";
	
	cout<<endl<<endl;

	//assegnazione numeri casuali con metodo range shrink di donald knuth
	for(i = 0; i < DIM - 1; i++)
	{
		int estratto, pos;
		pos = rand() % VSize;
//		cout<<pos<<endl; //test
		estratto = v[pos];
		v[pos] = v[VSize];
		VSize--;
		cout<<"["<<i+1<<"]\t"<<estratto<<endl;
		vettore[i] = estratto;
	}
	cout<<"["<<i+1<<"]\t"<<v[0]<<endl;//stampa ultimo valore rimasto
	vettore[DIM-1] = v[0];
	
	
	cout<<endl<<endl;
	
	for(i = 0; i < DIM; i++)cout<<vettore[i]<<"\t";
return 0;
}