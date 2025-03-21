export function getRelativeTime(timeStamp:number):string{
    const currentTime=Date.now();
    const timeDifference=currentTime-timeStamp*1000;

    const minutues=Math.floor(timeDifference/60000);
    const hours=Math.floor(minutues/60);
    const days=Math.floor(hours/24);

    if(minutues < 1){
        return "Just now";
    }
    else if(minutues < 60){
        return `${minutues} min${minutues === 1 ? "": "s"} ago`    ;
    }
    else if(hours < 24){
        return `${hours} hour${hours === 1 ? "": "s"} ago`;
    }
    else{
        return `${days} day${days === 1 ? "": "s"} ago`;
    }
}