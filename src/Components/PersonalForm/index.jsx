import React, { useState } from "react";
import $ from "jquery";
import "./index.css";
import ServerStatus from "../ServerStatus";
import firebaseClient from "../../firebaseClient";
import {initializeApp} from "firebase/app";
import { get, getDatabase, set, child, ref } from "firebase/database";

import { useForm } from "react-hook-form";

const app = initializeApp(firebaseClient);

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
                        setServerStatus(`Thank you Life designer #${ldNumber} your account has been submitted!`);
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
                    <label htmlFor="user-name">Name: </label>
                    <input {...register('user-name')} name="user-name" placeholder="Please enter your name" required/>

                    {/*ADDRESS INPUT */}
                    <label htmlFor="user-address">Address: </label>
                    <input {...register('user-address')} name="user-address" placeholder="123 starroad dr." required/>

                    {/*PHONE NUMBER INPUT */}
                    <label htmlFor="user-phone-number">Phone Number: </label>
                    <input {...register('user-phone-number')} name="user-phone-number" placeholder="8888888888" pattern="[0-9]{3}[0-9]{3}[0-9]{4}" maxLength={12} required/>

                    {/*EMAIL INPUT */}
                    <label htmlFor="user-email">Email: </label>
                    <input {...register('user-email')} type="email" name="user-email" placeholder="Please enter your email" required/>
                    
                    {/*BIRTHDAY INPUT*/}
                    <label for="user-birthday">Birthday: </label>
                    <input {...register('user-birthday')} type="date" id="birthday" name="user-birthday" required />

                    {/*AGE INPUT */}
                    <label htmlFor="user-age">Age: </label>
                    <input {...register('user-age')} name="user-age" pattern="[0-9]{1}[0-9]{1}" maxLength={2} placeholder="88" required/>
                
                    {/*PRONOUNS INPUT*/}
                    <label for="user-pronouns">Pronouns:</label>
                    <select {...register('user-pronouns')} id="pronouns" name="user-pronouns" required>
                        <option value="he/him">He/Him</option>
                        <option value="she/her">She/Her</option>
                        <option value="they/them">They/Them</option>
                        <option value="other">Other</option>
                    </select>

                    {/*NATIONALITY INPUT*/}
                    <label for="user-nationality">Nationality:</label>
                    <input type="text" {...register("user-nationality")} id="user-nationality" name="user-nationality" placeholder="Canadian" required />

                    <div id="break-line"></div>
                    {/*HEAD SIZE INPUT */}
                    <label htmlFor="user-head-size">Head Size: </label>
                    <input {...register('user-head-size')} name="user-head-size" placeholder="please indicate in inches" required/>

                    {/*SHIRT SIZE INPUT */}
                    <label htmlFor="user-shirt-size">Shirt Size: </label>
                    <input {...register('user-shirt-size')} name="user-shirt-size" placeholder="small, medium, etc." required/>

                    {/*PANTS SIZE INPUT */}
                    <label htmlFor="user-pants-size">Pants Size: </label>
                    <input {...register('user-pants-size')} name="user-pants-size" placeholder="small, medium, etc." required/>

                    {/*SHOE SIZE INPUT */}
                    <label htmlFor="user-shoe-size">Shoe Size: </label>
                    <input {...register('user-shoe-size')} name="user-shoe-size" placeholder="xx" required/>
                    
                    {/*FAVOURITE COLOUR INPUT */}
                    <label htmlFor="user-favourite-color">Favourite Colour: </label>
                    <input {...register('user-favourite-color')} name="user-favourite-color" placeholder="red, blue, etc." required/>
                    
                    {/*LD NUMBER INPUT */}
                    <label htmlFor="user-lifedesigner-number">Life Designer Number: </label>
                    <input type="text" {...register('user-lifedesigner-number')} name="user-lifedesigner-number" placeholder="222" onChange={(e) => {setLdNumber(e.target.value)}} required/>
                    
                    <input className="submit-button" type="submit" />
                </form>
            </div>
            {showServerStatus === true ? <ServerStatus data={serverStatus} /> : null}
        </>
    )
}

export default PersonalForm;