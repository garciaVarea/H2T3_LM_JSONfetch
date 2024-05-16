let boton = document.getElementById('BFiltros');
let initialMessage = document.getElementById('initialMessage');



boton.addEventListener('click', function() {
        initialMessage.style.display = 'none';

        let selectedSexo = document.getElementById('selectSexo').value;
        let selectedRedSocial = document.getElementById('selectRedSocial').value;
        let selectedSeguidores = document.getElementById('selectSeguidores').value;
        let selectedCuentaPrivada = document.getElementById('selectCuentaPrivada').value;

        fetch('json/encuestaRSS.json')
            .then(response => {
                    if (!response.ok) {
                            throw new Error("HTTP error " + response.status);
                    }
                    return response.json();
            })
            .then(data => {
                    let filteredData = data.filter(item =>
                        (selectedSexo === "" || item["Sexo"] === selectedSexo) &&
                        (selectedRedSocial === "" || item["Que red social usas más?"] === selectedRedSocial ||
                            (selectedRedSocial === "Otro" && item["Que red social usas más?"] !== "Instagram" && item["Que red social usas más?"] !== "Tiktok" && item["Que red social usas más?"] !== "Facebook" && item["Que red social usas más?"] !== "X")) &&
                        (selectedSeguidores === "" || item["Cuantos seguidores tienes en tu RS preferida?"] === selectedSeguidores) &&
                        (selectedCuentaPrivada === "" || item["Tenes la cuenta privada?"] === selectedCuentaPrivada)
                    );

                    let div = document.getElementById('displayDiv');

                    div.innerHTML = '';

                    filteredData.forEach(item => {
                            let container = document.createElement('div');
                            container.className = 'bg-white shadow m-2 hover:bg-gray-200 transition duration-200 rounded border border-gray-300 shadow-blue';
                            let name = document.createElement('p');
                            name.textContent = item["Nombre"];
                            name.className = 'font-bold text-lg';
                            container.appendChild(name);

                            let details = document.createElement('div');
                            details.style.display = 'none';
                            for (let key in item) {
                                    if (item.hasOwnProperty(key) && key !== "Nombre" && key !== "Puntuación") {
                                            let p = document.createElement('p');
                                            if (key === "Marca temporal") {
                                                    let date = new Date(item[key]);
                                                    p.textContent = "Fecha: " + date.toLocaleDateString();
                                            } else {
                                                    p.textContent = key + ": " + item[key];
                                            }
                                            details.appendChild(p);
                                    }
                            }
                            container.appendChild(details);

                            let closeButton = document.createElement('button');
                            closeButton.textContent = 'Cerrar';
                            closeButton.style.color = 'red';
                            closeButton.style.display = 'none';
                            closeButton.addEventListener('click', function(event) {
                                    event.stopPropagation();
                                    details.style.display = 'none';
                                    closeButton.style.display = 'none';
                            });
                            container.appendChild(closeButton);

                            container.addEventListener('click', function() {
                                    details.style.display = details.style.display === 'none' ? 'block' : 'none';
                                    closeButton.style.display = details.style.display === 'none' ? 'none' : 'block';
                            });

                            div.appendChild(container);
                    });
            })
            .catch(error => {
                    console.error('Error:', error);
            });
});