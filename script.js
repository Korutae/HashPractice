let state = {
    data: [],
    current: null,
}
const ul = document.querySelector("ul");

async function getData(){
    const response = await fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2307-ftb-et-web-ft/events');
    const json = await response.json();
    state.data = json.data;
    console.log("state:", state);
}

function renderData(){
    const html = state.data.map(function(product){
        return `
        <li>
        <div><a href = #${product.name}> ${product.name}</div>
        </li>
        `
    });
    ul.innerHTML = html.join('');
}

async function render(){
    await getData();
    renderData();
    selectData();
}

async function getCurrent(){
    const allData = await fetch(`https://fsa-crud-2aa9294fe819.herokuapp.com/api/2307-ftb-et-web-ft/events ${state.current}`)
    const currentData = await allData.json();
    state.current = currentData;
    console.log("state:", state);
}

function getEventFromHash(){
    const name = window.location.hash.slice(1)
    let firstWord = "";
    console.log(firstWord);

    const currentName = state.data.find((dataName) =>{
        
        //to make it only check the first word of the string
        //as that is what the hash looks for to compare
        //when i got this to work it started saying not found error
        firstWord = "";
        for(let i = 0; i < dataName.name.length; i++){
            if(dataName.name.charAt(i) === " ")
            {
                i = dataName.name.length;
            }else{
            firstWord += dataName.name.charAt(i);
            }
        }
        console.log("name:", firstWord === name)
        console.log(firstWord, "first word")
        return firstWord === name
    })

    console.log(currentName, "currentName")
    state.current = currentName;
    console.log(state);
}

function renderSingleData(){
    if(state.current){
        getCurrent();
    }
}

function selectData(){
    getEventFromHash();
    renderSingleData();

    window.scroll({
        top: 0,
        left:0,
        behavior: "smooth"
})
}

render();



