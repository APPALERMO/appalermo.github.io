// const istructionList = (DIM = 90) =>{
//     // const DIM = 90
//     let v = new Array(DIM)
//     let vet = new Array(DIM)
//     let size = DIM - 1
    
//     for(let i = 0; i<DIM; i++) v[i] = -i+DIM
    
//     for(let i = 0; i<DIM; i++){
//         let estratto, pos
        
//         pos = parseInt(Math.random() * 1E10) % size
//         estratto = v[pos]
//         v[pos] = v[size]
//         size --
        
//         vet[i] = estratto
//     }
//     vet[DIM-1] = v[0]
    
//     return vet
// }

// const istruzioni = istructionList()
// let mosse = 0
// console.log(istruzioni, "\n")
// const mossa = () =>{
//     if(mosse === 2) return
//     let s = istruzioni[mosse++] % 7
//     console.log(s)
//     mossa()
    
// }

// mossa()


const list = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
const find = 16

const binarySearch = (list, max,min) =>{
    let m = parseInt((max+min)/2)
    
    if(list[m] == find) return m
    else if(list[m] > find) return binarySearch(list, m-1, min)
    else if(list[m] < find) return binarySearch(list, max, m+1)
    
    return -1
}
  
console.log(binarySearch(list, list.length,0))
