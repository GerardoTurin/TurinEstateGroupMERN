import { useEffect, useState } from "react";
import useEstateStore from "../hooks/useEstateStore";
import { Link } from "react-router-dom";

const Contact = ({ listing }) => {
    const { startGetUserById } = useEstateStore();
    const [landlord, setLandlord] = useState(null);
    const [message, setMessage] = useState('');
    
    useEffect(() => {
        const fetchLandlord = async () => {
            const data = await startGetUserById(listing.userRef);
            console.log(data.user);
            setLandlord(data);
        }
        fetchLandlord();
    }, [listing]);  // eslint-disable-line react-hooks/exhaustive-deps

    console.log(landlord);

    if (!landlord) {
        return (
            <p>Loading...</p>
        )
    }
    const { name, email } = landlord.user;


    const onChange = (evt) => {
        setMessage(evt.target.value);
    }



    return (
        <>
            {
                landlord && (
                    <div className=" flex flex-col gap-2">
                        <h3>Contact</h3>
                        <p className="text-sm font-semibold">
                            { name }
                        </p>

                        <h4>for</h4>
                        <p className="text-sm font-semibold">
                            {listing.name}
                        </p>
                        <textarea 
                            className="w-full h-24 p-2 border border-gray-300 rounded-md"
                            placeholder="Message"
                            name="message"
                            id="message"
                            rows={2}
                            value={message}
                            onChange={onChange}
                        ></textarea>
                        {/* link a mailto */}
                        <Link to={`mailto:${email}?subject=Inquiry about ${listing.name}&body=${message}`}>
                            <button className="bg-slate-800 w-full text-white rounded-md p-2">
                                Contact
                            </button>
                        </Link>
                    </div>
                )
                
            }
        </>
    )
}

export default Contact;