import {getSession} from 'next-auth/client'

const handler = async (req,res) => {
    const session = await getSession({req})
    if(!session) {
        res.json({
            error: 'Unauthenticated user'
        })
    } else {
        res.json({
            message: 'Success',
            session
        })
    }

}

export default handler