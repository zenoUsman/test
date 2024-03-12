import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const YourComponent: React.FC = () => {
    const [node, setNode] = useState<string>('');
    const [walletAddress, setWalletAddress] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNode(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const provider = new ethers.providers.JsonRpcProvider('YOUR_RPC_ENDPOINT');
            const contract = new ethers.Contract('YOUR_CONTRACT_ADDRESS', YOUR_CONTRACT_ABI, provider);

            const address = await contract.getWalletAddress(node);
            setWalletAddress(address);
        } catch (error) {
            console.error('Error fetching wallet address:', error);
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

export default YourComponent;
