import { Toggle } from '@/components/UI/Toggle';
import Icon from '@/components/icons/Icon';
import { useState } from 'react';

const Settings = () => {
    const [emailNotificationToggle, setEmailNotificationToggle] = useState(false);
    const [twoFactorAuthToggle, setTwoFactorAuthToggle] = useState(false);
    const [billPaymentToggle, setBillPaymentToggle] = useState(false);

    const handleEmailNotificationToggleChange = () => {
        setEmailNotificationToggle(!emailNotificationToggle);
    };

    const handleTwoFactorAuthToggleChange = () => {
        setTwoFactorAuthToggle(!twoFactorAuthToggle);
    };

    const handleBillPaymentToggleChange = () => {
        setBillPaymentToggle(!billPaymentToggle);
    };

    return (
        <>
            <div className="settings h-screen w-full">
                <header className="settings__header w-full p-9 pl-20 flex gap-2 items-center max-sm:justify-center  max-sm:pl-0  ">
                    <Icon variant='settings' className='text-main '></Icon> <h1 className="text-2xl ">Settings</h1>
                </header>

                <section className='flex items-center justify-center mb-5'>
                    <div className='for-password bg-white w-11/12 h-[88px] rounded-lg'>
                        <div className="settings__header p-8 flex gap-2 justify-between items-center">
                            <span className="text-grey-1 font-medium text-lg">Password</span>
                            <a href="#" className="text-main font-medium text-lg ">Change password</a>
                        </div>
                    </div>
                </section>

                <section className='flex items-center justify-center'>

                    <div className='for-password bg-white w-11/12 h-[226px] max-sm:h-[240px] rounded-lg '>


                        <div className='pl-6 pr-6 pt-7'>
                        <div className="settings__header  border-b border-grey-4 h-12 "> 

                            <div className=" justify-between flex items-center  ">
                            <span className="text-grey-1 font-medium text-lg">Send e-mail notifications</span>
                            <a href="#" className="text-main text-lg ">
                                <Toggle
                                    selected={emailNotificationToggle}
                                    onSelectedChange={handleEmailNotificationToggleChange}
                                    label=""
                                    id="emailNotificationToggle"
                                />
                            </a>
                            </div>
                            
                        </div>
                        </div>
                        <div className='pl-6 pr-6 pt-4'>
                        <div className="settings__header  border-b border-grey-4 h-12 max-sm:h-16"> 
                                 <div className=" justify-between flex items-center  ">
                            <span className="text-grey-1 font-medium text-lg">Turn on two-factor authentication</span>
                            <a href="#" className="text-main text-lg ">
                                <Toggle
                                    selected={twoFactorAuthToggle}
                                    onSelectedChange={handleTwoFactorAuthToggleChange}
                                    label=""
                                    id="twoFactorAuthToggle"
                                />
                            </a>
                            </div>
                        </div>
                        </div>
                        <div className='pl-6 pr-6 pt-4'>
                        <div className="settings__header   h-12 "> 
                         <div className=" justify-between flex items-center  ">
                            <span className="text-grey-1 font-medium text-lg">Request approval for bill payment</span>
                            <a href="#" className="text-main text-lg ">
                                <Toggle
                                    selected={billPaymentToggle}
                                    onSelectedChange={handleBillPaymentToggleChange}
                                    label=""
                                    id="billPaymentToggle"
                                />
                            </a>
                        </div>
                        </div>
                        </div>

                    </div>
                </section>
            </div>
        </>
    )
}

export default Settings;
