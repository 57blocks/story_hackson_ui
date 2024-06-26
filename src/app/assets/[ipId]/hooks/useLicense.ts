import { config } from "@/components/WalletConnector/wagmi.config";
import { useDolphinReadContract } from "@/dolphin/readContract";
import { getAttachedLicenseTermsAbi } from "@/story/abi";
import { getResource, listResource } from "@/story/storyApi";
import { Term, RESOURCE_TYPE, LicenseWithTerms } from "@/story/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Address } from "viem";
import { readContract } from "wagmi/actions";

export default function useLicense(ipId: Address) {
    const [result, setResult] = useState<LicenseWithTerms[]>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<any>()
    const contract = {
        address: process.env.NEXT_PUBLIC_story_license_CONTRACT as Address,
        abi: getAttachedLicenseTermsAbi,
        functionName: getAttachedLicenseTermsAbi[0].name,
        args: [ipId, 0]  // get the first license
    } as any

    const fetchLicense = async () => {
        setIsLoading(true)
        try {
            const result = await readContract(config, contract) as any;
            if (result) {
                const licenseTemplateId = Number(result[1]).toString();
                const licenses = await getResource(
                    RESOURCE_TYPE.LICENSE_TERMS,
                    licenseTemplateId
                )
                if (licenses.data) {
                    setResult([{
                        ...licenses.data,
                        ipId
                    }]);
                }
            }
        } catch (err) {
            setError(err)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (ipId) {
            fetchLicense()
        }
    }, [ipId])

    return {
        result,
        error,
        isLoading
    }
}

// export default function useLicense(ipId: Address) {
//     const fetchLicenseTermsByIpId = async (id: string) => {
//         const { data } = await listResource(RESOURCE_TYPE.LICENSE_IP_TERMS, {
//             pagination: { limit: 0, offset: 0 },
//             where: { ipId: id }
//         });
//         if (data.length) {
//             const promises = data.map(async (term: Term) => {
//                 const licenses = await getResource(
//                     RESOURCE_TYPE.LICENSE_TERMS,
//                     term.licenseTermsId
//                 )
//                 return licenses
//             })
//             const licenses = await Promise.allSettled(promises).then((res) => {
//                 const result = res.map(({ value }: any) => {
//                     return {
//                         data: value.data,
//                     }
//                 })
//                 return result.filter(r => r.data).map(d => ({
//                     ...d.data,
//                     ipId
//                 })) as any[]
//             });
//             return licenses as LicenseWithTerms[];
//         }
//     }

//     const { isLoading, data } = useQuery({
//         queryKey: ['licenses', ipId],
//         queryFn: () => fetchLicenseTermsByIpId(ipId),
//     })

//     return {
//         isLoading,
//         data
//     }
// }