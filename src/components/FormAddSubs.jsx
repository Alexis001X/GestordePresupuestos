import {useState} from 'react';

const FormAddSubs =({ setType, setPrice, type, price, setSubs, subs, editID, setEditID, spent, count })=> {
    const[error, setError] = useState(false);
    const[errorMoney, setErrorMoney] = useState(false);

    const handleSubs = e => {
        e.preventDefault();
        if(price === "" || Number(price) < 0 || type === ""){
            setError(true);
            return;
        }
        if (count - spent < Number(price)){
        setErrorMoney(true);
        return;
        }
        setError(false);
        setErrorMoney(false);
        if(editID != ""){
            setEditID("");
            const newSubs = subs.map(item => {
                if(item.id === editID){
                    item.type = type;
                    item.price = price;
                }
                return item; 
            })
            setSubs(newSubs);
        } else {
        const data = {type: type, price: Number(price), id: Date.now()};
        setSubs([...subs, data]);
        }
        setType("");
        setPrice("");
    }
    return (
        <div className="add-subscription">
            <h3>Agregar Subscripciones:</h3>
            <form onSubmit={handleSubs}>
            <p>Servicio:</p>
            <select onChange={e => setType(e.target.value)} value={type}>
                <option value="">Elegir</option>
                <option value="netflix">Netflix</option>
                <option value="spotify">Spotify</option>
                <option value="disneyPlus">Disney</option>
                <option value="primevideo">Amazon</option>
                <option value="hboMax">HBO</option>
                <option value="starPlus">StarPlus</option>
                <option value="apletv">AppleTV</option>
            </select>
            <p>Cantidad</p>
            <input type="number" placeholder="20$" onChange={e => setPrice(e.target.value)} value={price}/>
            {editID != "" ? <input type="submit" value="Guardar"/> 
            :  <input type="submit" value="Agregar"/>}
           
            </form>
            {error ? <p className="error">Campos invalidos</p> : null}
            {errorMoney ? <p className="error">No tienes suficiente dinero</p> : null}


            </div>

    );

}
export default FormAddSubs