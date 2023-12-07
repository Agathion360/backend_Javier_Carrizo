import { Router } from 'express'


const router = Router()



router.get('/chat', (req, res) => {
    
    res.render('chat', {
        title: 'Coder Compras Chat',
        rutaJs: 'chat'
    })
})

export default router