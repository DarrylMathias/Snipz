"use client"
import SidebarSnippets from '@/components/SidebarSnippets'
import React from 'react'

export default function Component(){
  return(
    <SidebarSnippets>
      <Showcase />
    </SidebarSnippets>
  )
}

function Showcase(){
  return (
    <div>Showcase</div>
  )
}