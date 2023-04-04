import React, { useContext } from "react";
import { UserContext } from "../../App";

import defaultProfilePic from '../../default.png';

// Supabase
import { createClient } from "@supabase/supabase-js";
const supabase = createClient("https://jhdzfvickkuntlbimgls.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpoZHpmdmlja2t1bnRsYmltZ2xzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk1OTA5NzUsImV4cCI6MTk5NTE2Njk3NX0.N1fySNLgACXC_jt4J3ByYYTT08ABJUfS-fD-C0VIsz4");

function Header({ sendMessage }) {

    const session = useContext(UserContext);

    const handleSignOut = () => {
        sendMessage(null, session.user.name + " left", true);
        session.updateContext(undefined,)
    }

    /* const uploadImage = async (e) => {
        
        if (e.target.files) {
            let file = e.target.files[0];

            const { data, error } = await supabase.storage
                .from('profile-pictures')
                .upload('public/' + session.user.name, file, {
                    cacheControl: '3600',
                    upsert: false
                })

                if (data) {
                    const { data, error } = supabase
                    .storage
                    .from('profile-pictures')
                    .getPublicUrl('public/' + session.user.name);

                    if (data) {
                        console.log(data.publicUrl);

                        const { error } = await supabase
                            .from('users')
                            .update({ profile_pic: data.publicUrl})
                            .eq('name', session.user.name)

                        if (!error) {
                            let updateProfilePic = session.user;

                            updateProfilePic.profile_pic = data.publicUrl;
                            console.log(updateProfilePic);
                            session.updateContext(updateProfilePic);
                        }
                    } else {
                        console.log(error);
                    }
                } else {
                    console.log(error);
                }
            }
        
    } */

    const updateProfilePic = async (e) => {
        if (e.target.files) {
            let file = e.target.files[0];

            if (session.user.profile_pic === null) {
                const { data, error } = await supabase.storage
                .from('profile-pictures')
                .upload('public/' + session.user.user_id, file, {
                    cacheControl: '0',
                    upsert: false
                })

                if (data) {
                    const { data, error } = supabase
                    .storage
                    .from('profile-pictures')
                    .getPublicUrl('public/' + session.user.user_id);

                    if (data) {
                        console.log(data.publicUrl);

                        const { error } = await supabase
                            .from('users')
                            .update({ profile_pic: data.publicUrl})
                            .eq('user_id', session.user.user_id);

                        if (error) console.log(error);
                    }
                }
            } else {
                const { data, error } = await supabase.storage
                .from('profile-pictures')
                .update('public/' + session.user.user_id, file, {
                    cacheControl: '0',
                    upsert: true,
                });

                if (data) {
                    const { data, error } = supabase
                        .storage
                        .from('profile-pictures')
                        .getPublicUrl('public/' + session.user.user_id);

                    if (data) {
                        console.log(data.publicUrl);

                        const { error } = await supabase
                            .from('users')
                            .update({ profile_pic: data.publicUrl})
                            .eq('user_id', session.user.user_id);
                    }
                }
            }

        } else {
            console.log('no files')
        }
    }

    return (
        <div className="header" style={{
            display: 'flex',
            maxWidth: '59.9rem',
            flex: 1,
            position: 'fixed',
            backgroundColor: '#1c1c1c',
            width: '100%',
            height: 60,
            alignItems: 'center',
            justifyContent: 'space-between',
            borderWidth: '0px 0px 1px 0px',
            borderColor: '#282828',
            borderStyle: 'solid',
        }}>
            
            <div for="image-upload" className="left-header-content" style={{ display: 'flex', alignItems: 'center', margin: '0 10px'}}>
                <div className="profile-pic" style={{
                    width: 40,
                    height: 40,
                    backgroundColor: '#3e3e3e',
                    borderRadius: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                }} onClick={null}>
                    <input type="file" name="image-upload" style={{ opacity: '0', position: 'absolute', width: 40, height: 40 }} onChange={updateProfilePic} multiple={false} accept="image/*"/>
                    <img src={session.user.profile_pic != null ? session.user.profile_pic : defaultProfilePic} width="100%"/>
                </div>

                <h2 style={{ margin: '0px 10px', color: 'white', fontSize: '1.2rem', lineHeight: '2.25rem'}}>{session.user.name}</h2>
            </div>

            <button className="button" style={{ margin: '0px 10px'}} onClick={handleSignOut}>Sign Out</button>
        </div>
    )
}

export default Header;