import React, { useState } from "react";
import $ from "jquery";
import "./index.css";
import ServerStatus from "../ServerStatus";
import firebaseClient from "../../firebaseClient";
import {initializeApp} from "firebase/app";
import { get, getDatabase, set, child, ref } from "firebase/database";

import { useForm } from "react-hook-form";

const app = initializeApp(firebaseClient);

/*
    capitilize everything except for the "i"'s

    NAME:  
    ADDRESS:
    PHONE NUMBER: 
    EMAIL:
    BIRTHDAY:
    PRONOUNS:
    NATIONALITY:


    HEAD SIZE:
    SHIRT SIZE:
    PANT SIZE:
    SHOE SIZE:
    FAVOURITE COLOUR:
    LIFE DESIGN NUMBER: 
    COLORS: 


    LABELS: YELLOW WITH A BLUE TEXT STROKE
    PACEHOLDER: SMOKEY GREY

    PRODUCT PICS FALLING DOWN
    PICTURES OF FEEF POPPING UP SIMILAR TO BBS DINER

*/

const PersonalForm = () => {
    const [ldNumber, setLdNumber] = useState("");
    const [serverStatus, setServerStatus] = useState("");
    const [showServerStatus, setShowServerStatus] = useState(false);

    const {
        register,
        handleSubmit,
    } = useForm();

    const validateLdNumber = (_formData) => {
        const db_ref = ref(getDatabase());

        get(child(db_ref, "users/")).then((snapshot) => {
            if (!snapshot.exists()) {
                console.log("no data");
                writeToFirebase(_formData);

            } else if (snapshot.exists()) {
                const dataSnapshot = snapshot.val();

                for (const data in dataSnapshot) {
                    if (ldNumber !== data) {
                        writeToFirebase(_formData);
                        setServerStatus(`Welcome Life designer #${ldNumber}!`);
                        $("#server-status-container").fadeIn(500);
                        setTimeout(() => {
                            $("#server-status-container").fadeOut(500);
                        }, 2000);
                    } else {
                        console.log("invalid number already exists");
                        setServerStatus(`Sorry, Life designer #${ldNumber} already exists!`);
                        $("#server-status-container").fadeIn(500);
                        setTimeout(() => {
                            $("#server-status-container").fadeOut(500);
                        }, 2000);
                        return;
                    }
                }
            }
        })
    }

    const writeToFirebase = (_formData) => {
        const db = getDatabase();

        set(ref(db, "users/" + _formData["user-lifedesigner-number"]), {
            _formData
        });
    }

    return (
        <>
            <div id="form-container">
                <form className="form-container" onSubmit={handleSubmit((data) => {
                    setShowServerStatus(true);
                    validateLdNumber(data)
                })}>
                    {/*NAME INPUT */}
                    <label htmlFor="user-name">NAME: </label>
                    <input {...register('user-name')} name="user-name" placeholder="XYLK AKA PiGO THE PiNOY NiGO AKA FLEONARDO DiCAPRiO" required/>

                    {/*ADDRESS INPUT */}
                    <label htmlFor="user-address">ADDRESS: </label>
                    <input {...register('user-address')} name="user-address" placeholder="MANiLLA PHiLLiPiNES" required/>

                    {/*PHONE NUMBER INPUT */}
                    <label htmlFor="user-phone-number">PHONE NUMBER: </label>
                    <input {...register('user-phone-number')} name="user-phone-number" placeholder="555-308-1313" pattern="[0-9]{3}[0-9]{3}[0-9]{4}" maxLength={12} required/>

                    {/*EMAIL INPUT */}
                    <label htmlFor="user-email">EMAiL: </label>
                    <input {...register('user-email')} type="email" name="user-email" placeholder="ASK@XYLK.CO" required/>
                    
                    {/*BIRTHDAY INPUT*/}
                    <label for="user-birthday">BiRTHDAY: </label>
                    <input {...register('user-birthday')} type="date" id="birthday" name="user-birthday" placeholder="EVERYDAY" required />
                
                    {/*PRONOUNS INPUT*/}
                    <label for="user-pronouns">PRONOUNS:</label>
                    <select {...register('user-pronouns')} id="pronouns" name="user-pronouns" placeholder="HE/HiM" required>
                        <option value="he/him">HE<span className="unique-characters">/</span>HiM</option>
                        <option value="she/her">SHE<span className="unique-characters">/</span>HER</option>
                        <option value="they/them">THEY<span className="unique-characters">/</span>THEM</option>
                        <option value="other">OTHER</option>
                    </select>

                    {/*NATIONALITY INPUT*/}
                    <label for="user-nationality">NATiONALiTY:</label>
                    <input type="text" {...register("user-nationality")} id="user-nationality" name="user-nationality" placeholder="PiNOY TO THE BONE" required />

                    <div id="break-line"></div>
                    {/*HEAD SIZE INPUT */}
                    <label htmlFor="user-head-size">HEAD SiZE: </label>
                    <input {...register('user-head-size')} name="user-head-size" placeholder="TOO BiG LiKE WATER" required/>

                    {/*SHIRT SIZE INPUT */}
                    <label htmlFor="user-shirt-size">SHiRT SiZE: </label>
                    <input {...register('user-shirt-size')} name="user-shirt-size" placeholder="MEJiOOM" required/>

                    {/*PANTS SIZE INPUT */}
                    <label htmlFor="user-pants-size">PANTS SiZE: </label>
                    <input {...register('user-pants-size')} name="user-pants-size" placeholder="i PREFER NOT TO SAY" required/>

                    {/*SHOE SIZE INPUT */}
                    <label htmlFor="user-shoe-size">SHOE SiZE: </label>
                    <input {...register('user-shoe-size')} name="user-shoe-size" placeholder="13.5" required/>
                    
                    {/*FAVOURITE COLOUR INPUT */}
                    <label htmlFor="user-favourite-color">FAVOURiTE COLOR: </label>
                    <input {...register('user-favourite-color')} name="user-favourite-color" placeholder="LiGHT TAN" required/>
                    
                    {/*LD NUMBER INPUT */}
                    <label htmlFor="user-lifedesigner-number">LiFE DESiGN: </label>
                    <input type="text" {...register('user-lifedesigner-number')} name="user-lifedesigner-number" placeholder="JUAN" onChange={(e) => {setLdNumber(e.target.value)}} required/>
                    <div id="break-line"></div>

                    {/*PRONOUNS INPUT*/}
                    <label for="user-subscribe">WOULD YOU SUBSCRiBE<span className="unique-characters">?</span> OFC</label>
                    <select {...register('user-subscribe')} id="subscribe" name="user-subscribe" required>
                        <option value="he/him">YES</option>
                        <option value="she/her">NO</option>
                    </select>
                    
                    <input className="submit-button" type="submit" value="SiGN ME UP"/>
                </form>
            </div>
            {showServerStatus === true ? <ServerStatus data={serverStatus} /> : null}
        </>
    )
}

export default PersonalForm;