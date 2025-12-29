import { Button } from '@/components/ui/button'
import React from 'react'

const Navbar = () => {
  return (
    <div className="w-full flex justify-between items-center">
        <h1 className="text-xl font-semibold">Tiramisu</h1>
        <Button variant="outline">
            Get Started
        </Button>
    </div>
  )
}

export default Navbar