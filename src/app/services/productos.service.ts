import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor( private http: HttpClient ) {
    this.cargarProductos();
  }


  private cargarProductos() {
    return new Promise( (resolve, reject) => {

        this.http.get('https://angular-html-1b959-default-rtdb.europe-west1.firebasedatabase.app/productos_idx.json')
        .subscribe( (resp: any) => {
          //console.log(resp);
          this.productos = resp;
          setTimeout(() => {
            this.cargando = false;
          }, 1000);

          //resolve();
        });

      } );
  }


  getProducto(id: string){
    return this.http.get(`https://angular-html-1b959-default-rtdb.europe-west1.firebasedatabase.app/productos/${id}.json`);              
  }


  buscarProducto( termino: string ){
      if (this.productos.length === 0) {
        // cargar productos
        this.cargarProductos().then( ()=>{
          //ejecutar despues de tener los productos
          // aplicar el filtro
          this.filtrarProductos(termino);
        } );

      } else {
        // aplicar el filtro
        this.filtrarProductos(termino);
      }
/*        this.productosFiltrado = this.productos.filter( producto => {
          this.cargando = false;
          return true;
        });
        console.log('buscarProducto.productosFiltrado',this.productosFiltrado); */      
  }

  private filtrarProductos(termino: string ){
    //console.log(this.productos);
    this.productosFiltrado = [];
    termino = termino.toLowerCase();

    this.productos.forEach( prod => {
        
      const tituloLower = prod.titulo.toLowerCase();

      if (prod.categoria.indexOf (termino) >=0 || tituloLower.indexOf (termino) >=0 ) {
        this.productosFiltrado.push(prod);
      }

    });
  }

}
