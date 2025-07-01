document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.contenedor-tienda')) {
        const filtros = document.querySelectorAll('.filtros input[type="checkbox"]');
        const productos = document.querySelectorAll('.grid-productos .producto');

        function filtrarProductos() {
            const filtrosActivos = {};
            filtros.forEach(filtro => {
                if (filtro.checked) {
                    const tipo = filtro.closest('.filtro-seccion').getAttribute('data-filtro');
                    if (!filtrosActivos[tipo]) {
                        filtrosActivos[tipo] = [];
                    }
                    filtrosActivos[tipo].push(filtro.id);
                }
            });

            productos.forEach(producto => {
                const dataProducto = {
                    equipo: producto.getAttribute('data-equipo'),
                    piloto: producto.getAttribute('data-piloto')
                };

                let mostrar = true;

                for (const tipo in filtrosActivos) {
                    if (filtrosActivos[tipo].length > 0 && !filtrosActivos[tipo].includes(dataProducto[tipo])) {
                        mostrar = false;
                        break;
                    }
                }
                
                producto.style.display = mostrar ? 'block' : 'none';
            });
        }

        filtros.forEach(filtro => {
            filtro.addEventListener('change', filtrarProductos);
        });
    }
});