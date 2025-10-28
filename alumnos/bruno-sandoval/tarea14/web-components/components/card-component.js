export class CardComponent extends HTMLElement{
    constructor(){
        super();
        this.img = 'https://www.demonslayer-api.com/api/v1/characters/images/1.webp';
        this.name = 'Tanjiro Kamado';
        this.description = 'Is the main protagonist of Demon Slayer. He joined the Demon Slayer Corp to find a remedy to turn his sister, Nezuko Kamado, back into a human and to hunt down and kill demons.';
        this.race ="Human";
        this.age = 16;
        this.gender = "Male";
        this.quote = "Work at it. All I can do is work hard! That´s the story of my life!";
        this.attachShadow({mode:'open'});
    }
    
    static observedAttributes = ['img','name','description','race','age','gender','quote'];


    connectedCallback() {
        console.log('se ejecuto connectedCallback');
        this.render();
    }

    disconnectedCallback() {
        console.log('se ejecuto disconnectedCallback');
    }

    attributeChangedCallback(attr, oldValueAttr, valueAttr) {
        if (attr === 'img') {
            this.img = valueAttr;
        } else if (attr === 'name') {
            this.name = valueAttr;
        } else if (attr === 'description') {
            this.description = valueAttr;
        } else if (attr === 'race') {
            this.race = valueAttr;
        } else if (attr === 'age') {
            this.age = valueAttr;
        } else if (attr === 'gender') {
            this.gender = valueAttr;
        } else if (attr === 'quote') {
            this.quote = valueAttr;
        }
        this.render();
    }
    
    render(){
        this.shadowRoot.innerHTML = '';
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
            :root{
                --primary-color: rgb(243 244 246);
                --second-color: rgb(107 114 128);
                --tertiary-color: #ffffff;
                --boder-color: rgb(229 231 235);
                --text-primary: rgb(31 41 55);
                --button-boton: #374467;
                --accent-color: #38b2ac;
                --accent-color-hover: #319795;
            }
            .card{
                cursor: pointer;
                width: 17rem;
                height: 550px;
                position: relative;
                transform-style: preserve-3d;
                transition: transform 1s;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                &>.font-face{
                    &>.card-img{
                        width: 100%;
                        height: 18rem;
                
                        &>img{
                            width: 100%;
                            height: 100%;
                            /*object-fit: cover;*/
                        }
                    }
                    &>.card-body{
                        box-sizing: border-box;
                        padding: 1rem;
                        padding-bottom: 1.5rem;
                        color: var(--second-color);
                        &>h2{
                            color: var(--text-primary);
                            font-size: 1.5rem;
                            margin: 0;
                        }
                        &>p{
                            font-size: 0.9rem;   
                            margin: 0;           
                        }
                    }
                }
                &>.back-face{
                    transform: rotateY(180deg);
                    color: var(--second-color);
                    padding: 1rem;
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: column;
                    &>h2{
                        color: var(--text-primary);
                        font-size: 1.5rem;
                        text-align: center;
                    }
                    &>.attribute{
                        display: flex; 
                        justify-content: space-between;
                        font-size: 1rem;
                        border-bottom: 1px solid var(--boder-color);

                        &>p {
                            margin: 0.5 0;
                        }

                        &>p:nth-child(2) {
                            color: var(--text-primary);
                        }
                    }
                    &>p{
                        font-size: 1rem;
                        padding: 1rem;
                        background-color: var(--primary-color);
                        margin-top: 0.75rem;
                        border-radius: 0.25rem;
                        font-style: italic;
                        text-align: center;
                    }
                    &>button{
                        background-color: var(--button-boton);
                        border-radius: 0.5rem;
                        border: none;
                        font-size: 1rem;
                        color: var(--tertiary-color);
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                        width: 100%;
                        padding: 0.5rem 1rem;
                        margin-top: auto;
                        &:hover {
                            background-color: #4a5a8a;
                        }
                        &>svg{
                            color: var(--tertiary-color);
                            width: 1rem;
                            height: 1rem;
                        }
                    }
                }

                &>.font-face,
                &>.back-face{
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    backface-visibility: hidden;
                    background-color: var(--tertiary-color);
                    border-radius: 0.5rem;
                }
            }

            .card.flipped{
                transform: rotateY(180deg);
            }
            </style>
            <div class="card">
                <div class="font-face">
                    <div class="card-img">
                        <img src="${this.img}" alt="${this.name}">
                    </div>
                    <div class="card-body">
                        <h2>${this.name}</h2>
                        <p>${this.description}</p>
                    </div>
                </div>
                <div class="back-face">
                    <h2>${this.name}</h2>
                    <div class="attribute">
                        <p>Race</p>
                        <p>${this.race}</p>
                    </div>
                    <div class="attribute">
                        <p>age</p>
                        <p>${this.age}</p>
                    </div>
                    <div class="attribute">
                        <p>gender</p>
                        <p>${this.gender}</p>
                    </div>
                    <p>${this.quote}</p>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#ffffff"><path d="M482-160q-134 0-228-93t-94-227v-7l-64 64-56-56 160-160 160 160-56 56-64-64v7q0 100 70.5 170T482-240q26 0 51-6t49-18l60 60q-38 22-78 33t-82 11Zm278-161L600-481l56-56 64 64v-7q0-100-70.5-170T478-720q-26 0-51 6t-49 18l-60-60q38-22 78-33t82-11q134 0 228 93t94 227v7l64-64 56 56-160 160Z"/></svg>
                        Regresar al frente
                    </button>
                </div>
            </div>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('.card').addEventListener('click', this.handleCardFlip);
    }

    handleCardFlip = () => {
        this.shadowRoot.querySelector('.card').classList.toggle('flipped');
    }
}