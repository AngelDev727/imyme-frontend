export interface SurveyState {
    answer: any
    results: any
    survey_obj: SurveyObject
    answerId: string | null
    edited: boolean
    answerHistory: any[]
    createdAt?: any
}

export interface SurveyObject {
    createdAt?: string | number | Date
    customerId?: string
    id?: string
    selection: Selection
}

interface Selection {
    q1?: NestedAnswer
    q2?: NestedAnswer
    q3?: MultiAnswer
    q4?: MultiAnswer
    q5?: MultiAnswer
    q6?: MultiAnswer
    q7?: MultiAnswer
    q8?: SingleAnswer
    q9?: SingleAnswer
    q10?: ThreeAnswer
    q11?: NestedAnswer
    q12?: MultiAnswer
    q13?: MultiAnswer
    q14?: MultiAnswer
    q15?: LastAnswer
}

type SingleAnswer = [number]
type MultiAnswer = Array<number>
type LastAnswer = [string, string, number, number]
type NestedAnswer = Array<MultiAnswer>
type ThreeAnswer = [number, number, number]

export interface Results {
    acne: number
    answerId: string
    createdAt: Date
    detailAdvice1: string
    detailAdvice2: string
    eatingHabit: number
    excercise: number
    id: string
    mentality: number
    recommends: Recommends
    sensitivity: number
    sensitivityAdvice: string
    skinMapping: SkinMapping
    skinType: string
    skinTypeAdvice: string
    sleep: number
    spot: number
    stress: number
    updatedAt: Date
    wrinkle: number
    zoneAdvice1: string
    zoneAdvice2: string
    zoneAdviceId: string
}

interface Recommends {
    serum: Array<Product>
    soap: Array<Product>
}

interface Product {
    id: string
    description: Array<Description>
    name: string
    type: string
}

interface Description {
    upper: string
    lower: string
}

interface SkinMapping {
    description: Array<string>
    skinCode: string
}
