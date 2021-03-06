Vue.component('Sistema', {
    props: [ 'title', 'value', 'tipo', 'dec', 'bin', 'oct', 'hex'],
    
    template: `
                <div>
                    <h2>Sistema {{ title }}</h2>
                    <input type="number" min="0"
                        v-if="tipo=='number'"
                        v-bind:value="value"
                        v-on:input="$emit('input', $event.target.value)">
                    <input type="text" 
                        v-else-if="tipo=='text'"
                        v-bind:value="value"
                        v-on:input="$emit('input', $event.target.value)">
                    <p>Decimal:  {{dec}} </br>
                       Binario:  {{bin}} </br>
                       Octal:  {{oct}} </br>
                       Hexadecimal:  {{hex}} </p>
                </div>   
                `
})



new Vue({
    el: '#app',

    data(){
        return{
         ingreso: 0,
         ingreso_bin: 0,
         ingreso_oct: 0,
         ingreso_hex:0
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
            return this.bin_x(2, this.ingreso_bin, "binario");
        },

        bin_oct(){
            return this.decimal_a_x(8, this.bin_deci);
        },

        bin_hex(){
            return this.decimal_a_x(16, this.bin_deci);
        },


        oct_deci(){
            return this.bin_x(8, this.ingreso_oct, "octal");
        },

        oct_bin(){
            return this.decimal_a_x(2, this.oct_deci);
        },

        oct_hex(){
            return this.decimal_a_x(16, this.oct_deci);
        },


        hex_deci(){
            return this.bin_x(16, this.ingreso_hex);
        },

        hex_bin(){
            return this.decimal_a_x(2, this.hex_deci);
        },

        hex_oct(){
            return this.decimal_a_x(8, this.hex_deci,);
        },

        

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

        bin_x(base, source, mensaje){//código para convertir de un sistema x a decimal
            let resultado, binario;
            if(base == 16){
                binario = source;
                binario = binario.toString().split("").reverse();

                for(let i = 0; i < binario.length; i++){
                    if( binario[i] == 'A' | binario[i] == 'a') { binario[i] = 10 }
                    if( binario[i] == 'B' | binario[i] == 'b') { binario[i] = 11 }
                    if( binario[i] == 'C' | binario[i] == 'c') { binario[i] = 12 }
                    if( binario[i] == 'D' | binario[i] == 'd') { binario[i] = 13 }
                    if( binario[i] == 'E' | binario[i] == 'e') { binario[i] = 14 }
                    if( binario[i] == 'F' | binario[i] == 'f') { binario[i] = 15}
                }
            } else {
            binario = Math.floor(Math.abs(source));
            binario = binario.toString().split("").reverse();
            }

            binario = binario.map( (value) => {
                return parseInt(value)
            } )

            const validacion = binario.some( (value) => value > (base-1) );

            if(validacion){
                resultado = "Ingresaste un número no " + mensaje + ", intenta de nuevo";
            }else{
                for(let i = 0; i < binario.length; i++){
                    binario[i] = Math.pow(base, i) * binario[i];
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
});


