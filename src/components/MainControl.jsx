/**
 * MainControl component is responsible for managing the state and rendering the main form, balance, form to add subscriptions, and display items.
 * @param {Object} props - The component props.
 * @param {number} props.count - The count value.
 * @returns {JSX.Element} The rendered MainControl component.
 */
import { useState } from "react";
import Balance from "./Balance";
import FormAddSubs from "./FormAddSubs";
import DisplayItems from "./Displayitems";

const MainControl = ({ count }) => {
    const [subs, setSubs] = useState([]); // [ {type: "Netflix", price: 20}, {type: "Spotify", price: 10} ]
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");
    const [editID, setEditID] = useState("");
    const [spent, setSpent] = useState(0); // [ {type: "Netflix", price: 20, id: 1}, {type: "Spotify", price: 10, id: 2} ]

    /**
     * Deletes an item from the subscriptions list.
     * @param {number} id - The ID of the item to be deleted.
     */
    const eliminarItem = (id) => {
        const newList = subs.filter((item) => item.id !== id);
        setSubs(newList);
    };

    /**
     * Sets the editID state and updates the type and price states based on the selected item.
     * @param {number} id - The ID of the item to be edited.
     */
    const editItem = (id) => {
        setEditID(id);
        subs.map((item) => {
            if (item.id === id) {
                setType(item.type);
                setPrice(item.price);
            }
        });
    };

    return (
        <>
            <div className="main-form">
                <Balance count={count} subs={subs} spent={spent} setSpent={setSpent} />
                <FormAddSubs
                    setType={setType}
                    setPrice={setPrice}
                    type={type}
                    price={price}
                    setSubs={setSubs}
                    subs={subs}
                    editID={editID}
                    setEditID={setEditID}
                    spent={spent}
                    setSpent={setSpent}
                    count={count}
                />
            </div>
            <DisplayItems subs={subs} eliminarItem={eliminarItem} editItem={editItem} />
        </>
    );
};

export default MainControl;