import React, { useState, useEffect, useRef } from 'react'
import { db, auth } from '../../../firebase';
import { onSnapshot, collection, doc } from 'firebase/firestore';
import SendMessage from './Sendmessage';

const Channel = () => {
    const scroll = useRef()
    const [messages, setMessages] = useState([])
    useEffect(() => {
        onSnapshot(collection(db, "prdRoom"), (snapshot) => {
            setMessages(snapshot.docs.map(doc => doc.data()))
        })
    }, [])

    return (
        <div>
            <div>Channel</div>
            <div className="msgs">
                {prdRoom.map(({ id, text, photoURL, uid, displayName }) => (
                    <div>
                        <div key={id} className={`msg ${uid === auth.currentUser.uid ? 'sent' : 'received'}`}
                            style={{ backgroundColor: '#ffa', borderRadius: 100, paddingLeft: 30 }}>
                            <img src={photoURL} alt="" />
                            <p>{uid}</p>
                            <p>{displayName}</p>
                            <p>{text}</p>
                        </div>
                    </div>
                ))}
            </div>
            <SendMessage scroll={scroll} />
            <div ref={scroll}></div>
        </div>
    )
}

export default Channel;