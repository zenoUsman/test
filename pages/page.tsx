import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import contractAbi from './contractAbi.json';

const Search: React.FC = () => {
    const [node, setNode] = useState<string>('');
    const [walletAddress, setWalletAddress] = useState<string>('');
    const [isRequestPending, setIsRequestPending] = useState<boolean>(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNode(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!isRequestPending) {
            setIsRequestPending(true);
            try {
                const provider = new ethers.InfuraProvider('matic', 'put your infura key');

                const contract = new ethers.Contract('0x94C104e1BaF7e4027f3ee57E3f7A0FE2915aD5Ae', contractAbi, provider);

                const address = await contract.getDomainOwner(node);
                setWalletAddress(address);
            } catch (error) {
                console.error('Error fetching wallet address:', error);
            } finally {
                setIsRequestPending(false);
            }
        } else {
            console.log('A request is already pending. Please wait for the previous request to complete.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Node:
                    <input type="text" value={node} onChange={handleInputChange} />
                </label>
                <button type="submit">Get Wallet Address</button>
            </form>
            <p>Wallet Address: {walletAddress}</p>
        </div>
    );
};

export default Search;
