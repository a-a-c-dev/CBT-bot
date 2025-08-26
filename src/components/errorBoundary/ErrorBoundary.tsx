'use client'


import { Component, type ErrorInfo, type ReactNode, type CSSProperties } from 'react';

type ErrorBoundaryProps = {
    children?:ReactNode
}

type ErrorBoundaryState = {
    hasError:boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState>{
    constructor(props:ErrorBoundaryProps){
        super(props);
        this.state = {hasError:false }
    }
    static getDerivedStateFromError(_:unknown):ErrorBoundaryState{
        return {hasError: true}
    }
    componentDidCatch(error: unknown, errorInfo: ErrorInfo): void {
        console.error('Error caught', error, errorInfo)
    }


    render(){
        return this.state.hasError? (
            <div className='container-error'>
                <h2 className='error-title'>משהו קרה</h2>    
                <p className='error-message'>קרתה תקלה לא צפויה, בבקשה תרפרש את העמוד.</p>
                <p className='error-message'>אם התקלה עקבית וחוזרת על עצמה אנא פנא אלינו</p>
                <button className='error-button' onClick={()=>window.location.reload()}>
                    לרפרוש של הדף לחץ כאן
                </button>
            </div>

        ) 
        : this.props.children;

    }


}


export default ErrorBoundary