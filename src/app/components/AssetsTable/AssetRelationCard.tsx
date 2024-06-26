import { NftWithAsset } from "@/app/hooks/useIPAssetNfts";
import { Asset, GraphDetial } from "@/story/types";
import formatAddress from "@/utils/formatAddress";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import Image from 'next/image';
import ImgPlaceholder from '@/../public/images/imagePlaceholder.png'
import { use, useEffect, useState } from "react";

export default function AssetRelationCard({
    asset,
    ips
}: {
    asset: Asset
    ips?: GraphDetial[]
}) {
    const [price, setPrice] = useState('0');
    useEffect(() => {
        if (ips?.length) {
            const ip = ips.find(i => asset.id.toLowerCase() === i.ipId)
            setPrice((Number(ip?.price) / 1e18).toFixed(6));
        }
    }, [ips])
    return (
        <div className="border bg-white rounded-lg">
            <div className="p-2 grid grid-cols-5">
                <Image
                    className="col-span-1 object-cover aspect-square rounded-lg "
                    src={asset.nftMetadata.imageUrl ? `https://ipfs.io/ipfs/${asset.nftMetadata.imageUrl.replace('ipfs://', '')}` : ImgPlaceholder}
                    width={100}
                    height={100}
                    alt=""
                />
                <div className="ml-4 col-span-3">
                    <h4 className="text-lg font-medium hover:text-indigo-600">
                        <Link href={`/assets/${asset.id}`}>{asset.nftMetadata.name || 'Untitled'}</Link>
                    </h4>
                    <p>IP ID: {formatAddress(asset.id)}</p>
                    <h4 className="text-lg font-bold text-green-600">{price}</h4>
                </div>
                <div className="flex justify-center items-center ml-4">
                    <ChevronRightIcon />
                </div>
            </div>
            <Link href={`/assets/${asset.id}`}>
                <div className="border-t flex justify-around">
                    <div
                        className="py-1 text-indigo-600 border-r cursor-pointer text-center flex-1"
                    >Buy</div>
                    <div
                        className="py-1 text-indigo-600 cursor-pointer text-center flex-1"
                    >Remix</div>
                </div>
            </Link>
        </div>
    )
}