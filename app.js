new Vue({
    el: '#app',

    data(){
        return{
         ingreso: 0,
         ingreso_bin:0
        }
    },

    computed: {
        deci_bin(){ 
            return this.decimal_a_x(2, this.ingreso);
        },

        deci_oct(){
            return this.decimal_a_x(8, this.ingreso);
        },

        deci_hex(){
            return this.decimal_a_x(16, this.ingreso);
        },


        bin(){//corregir
            let resultado
            let binario = Math.floor(Math.abs(this.ingreso_bin));
            binario = binario.toString();
            binario = binario.split("");
            binario.reverse();

            binario = binario.map( (value) => {
                return parseInt(value)
            } )

            const validacion = binario.some( (value) => value > 1 );

            if(validacion){
                resultado = "NaN";
            }else{
                resultado = this.ingreso_bin;
            }
            return resultado;
            
            
        },

        bin_deci(){
            return this.bin_x();
        },

        bin_oct(){
            return this.decimal_a_x(8, this.bin_deci);
        },

        bin_hex(){
            return this.decimal_a_x(16, this.bin_deci);
        }

    },

    methods: {
        decimal_a_x(div, source){//código para convertir de sistema decimal a otros
            let divisor = div, dividendo = Math.floor(Math.abs(source)), residuo=[], resultado;
    
            do{
                resultado = dividendo % divisor;
                dividendo = Math.floor(dividendo / divisor);
                
                if(div == 16){
                    if(resultado === 10) { resultado = 'A' }
                    if(resultado === 11) { resultado = 'B' }
                    if(resultado === 12) { resultado = 'C' }
                    if(resultado === 13) { resultado = 'D' }
                    if(resultado === 14) { resultado = 'E' }
                    if(resultado === 15) { resultado = 'F' }
                }
                
                residuo.push(resultado);

            }while(dividendo > 0)

            return residuo.reverse().join('');

        },

        bin_x(){//código para convertir de sistema binario a otros
            let resultado
            let binario = Math.floor(Math.abs(this.ingreso_bin));
            binario = binario.toString().split("").reverse();

            binario = binario.map( (value) => {
                return parseInt(value)
            } )

            const validacion = binario.some( (value) => value > 1 );

            if(validacion){
                resultado = "Ingresaste un número no binario, intenta de nuevo";
            }else{
                for(let i = 0; i < binario.length; i++){
                    binario[i] = Math.pow(2, i) * binario[i];
                }

                if(binario[0] != null){
                    resultado = binario.reduce( (total, value) => {
                    return total + value;
                    })
                }
            }
            return resultado;

            //BUG! BUG! Error a partir de 21-22 dígitos
        }
    }
})


