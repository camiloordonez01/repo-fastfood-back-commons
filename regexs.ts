import { IRegexExp } from './application/common/types'

const regex: IRegexExp = {
    REGEX_PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
}
export default regex
