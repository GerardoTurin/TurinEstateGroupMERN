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
            //console.log(data.user);
            setLandlord(data);
        }
        fetchLandlord();
    }, [listing]);  // eslint-disable-line react-hooks/exhaustive-deps

    //console.log(landlord);

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
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                            <h3>Contact Name:</h3>
                            <p className="text-base font-semibold">
                                { name }
                            </p>
                        </div>

                        <div className="flex gap-2">
                            <h4>For:</h4>
                            <p className="text-base font-semibold">
                                {listing.name}
                            </p>
                        </div>
                        {/* <textarea 
                            className="w-full h-24 p-2 border border-gray-300 rounded-md"
                            placeholder="Message"
                            name="message"
                            id="message"
                            rows={2}
                            value={message}
                            onChange={onChange}
                        ></textarea> */}
                        {/* link a mailto */}
                        <Link to={`mailto:${email}?subject=<TurinEstateGroup> Inquiry about ${listing.name}&body=${message}`}>
                            <button className="bg-slate-800 w-full text-white rounded-md p-2 mt-5">
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