'use client'

import { Button, ChevronDownIcon, Spinner } from "@radix-ui/themes";
import { useState } from "react";
import clx from "classnames";
import AssetRelation from "./AssetRelation";
import Link from "next/link";
import formatAddress from "@/utils/formatAddress";
import Image from 'next/image';
import ImgPlaceholder from '@/../public/images/imagePlaceholder.png'
import { Asset, GraphDetial } from "@/story/types";

export default function AssetItem({
    asset,
    ips,
    index
}: {
    asset: Asset,
    index: number
    ips?: GraphDetial[]
}) {
    const [open, setOpen] = useState(false);
    const [prices, setPrices] = useState<number[]>([]);
    const [pricesLoading, setPricesLoading] = useState(false);
    const handlePrices = () => {
        if (prices.length) {
            if (prices.length > 1) {
                return `${prices[0].toFixed(6)}-${prices[prices.length - 1].toFixed(6)}`
            }
            return prices[0].toFixed(5)
        }
        return 0
    }
    const numbers = [0.4, 0.6, 0.9];
    return (
        <li className="odd:bg-gray-100 rounded-lg">
            <div className="flex justify-between items-center p-4">
                <Image
                    className="w-16 h-16 rounded-lg object-cover"
                    src={asset.nftMetadata.imageUrl ? `https://ipfs.io/ipfs/${asset.nftMetadata.imageUrl.replace('ipfs://', '')}` : ImgPlaceholder}
                    width={100}
                    height={100}
                    alt=""
                    overrideSrc={ImgPlaceholder.src}
                />
                <div className="flex flex-1 ml-4 items-center">
                    <div className="w-1/3">
                        <h4 className="text-lg font-bold hover:text-indigo-600">
                            <Link href={`/assets/${asset.id}`}>{asset.nftMetadata.name || 'Untitled'}</Link>
                        </h4>
                        <p>IP ID: {formatAddress(asset.id)}</p>
                    </div>
                    <div className="h-[30px] w-[1px] bg-gray-300 ml-4"></div>
                    <div className="flex ml-4 basis-1/2 flex-1 justify-between items-center">
                        <div className="w-1/3">
                            <h4 className="text-lg font-bold text-green-600">
                                {
                                    pricesLoading ? <Spinner /> : `${handlePrices()} ETH`
                                }
                            </h4>
                            <p>Current Price</p>
                        </div>
                        <div>
                            <h4 className="text-lg font-medium">{numbers[index]}</h4>
                            <p>dPrice / dRemix</p>
                        </div>
                        <div>
                            <h4 className="text-lg font-medium">Live</h4>
                            <p>Trading Status</p>
                        </div>
                    </div>
                </div>
                <div className="h-[30px] w-[1px] bg-gray-300 ml-4"></div>
                <Button
                    variant="ghost"
                    className="mx-4 px-2 cursor-pointer"
                    onClick={() => setOpen(!open)}
                >
                    Expand Collection
                    <ChevronDownIcon
                        className={clx('transition-all', {
                            'rotate-180': open
                        })}
                    />
                </Button>
            </div>
            <AssetRelation
                asset={asset}
                isVisible={open}
                ips={ips}
                getPrice={setPrices}
                getPriceLoading={setPricesLoading}
            />
        </li>
    )
}