import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductoDesc } from '../../interfaces/producto-descripcion.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto: ProductoDesc | any;
  id: string = '';

  constructor(private route: ActivatedRoute,
              public productoService: ProductosService) { }

  ngOnInit() {
    this.route.params
    .subscribe( param => {
        //console.log(param);
        //console.log(param['id']);
        this.productoService.getProducto(param['id'])
                            .subscribe( (prod: ProductoDesc | any) =>{
                                //console.log('this.productoService.getProducto',prod);
                                this.id = param['id'];
                                this.producto = prod;
                              }
                            );
    });
  }

}
