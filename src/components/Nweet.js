import { dbService } from "fbase";
import React, { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const onDeleteClilck = async () => {
        const ok = window.confirm("Are you sure delete this");
        if(ok) {
            dbService.doc('nweets/${nweetObj.id}').delete();    //how to get data in string. At ${nweetObj.id}
        }
    }
    const toggleEditing = () => setEditing((prev) => !prev);
    const onChange = (event) => {
        const {target: {value}, } = event;
        setNewNweet(value);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc('nweets/${nweetObj.id}').update({
            text:newNweet,
        });
        setEditing(false);
    };
    return (
        <div>
            {editing ? (
                <>
                <form onSubmit={onSubmit}>
                    <input type="text" placeholder= "edit your nweet" value={newNweet} required onChange={onChange} />
                    <input type="submit" value="Update Nweet" />
                </form>
                <button onClick={toggleEditing}>Cancel</button>
                </>
                ) : (
                <>
                <h4>{nweetObj.text}</h4>
                {isOwner && (
                    <>
                        <button onClick={onDeleteClilck}>Delete Nweet</button>
                        <button onClick={toggleEditing}>Edit Nweet</button>
                    </>
                )}
                </>
            )}
        </div>
    );
};

export default Nweet;