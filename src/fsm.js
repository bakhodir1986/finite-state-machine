class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {

        if (config === undefined) {
            throw new Error
        }

        this.config = config
        this.currentState = config.initial
        this.states = []
        this.currentPos = 0
        this.states[this.currentPos] = config.initial


    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.states[this.currentPos]
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {

        switch (state) {
            case 'normal':
                break;
            case 'busy':
                break;
            case 'sleeping':
                break;
            case 'hungry':
                break;
            default:
                throw new Error

        }

        this.currentPos = this.currentPos + 1
        this.states[this.currentPos] = state
    }



    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {

        var state = this.getState()
        console.log(state)
        console.log(event)

        switch (event) {
            case 'study':
                switch (state) {
                    case 'normal':
                        this.changeState('busy')
                        break;
                    default:
                        throw new Error
                }
                break;
            case 'get_tired':
                switch (state) {
                    case 'busy':
                        this.changeState('sleeping')
                        break;
                    default:
                        throw new Error
                }
                break;
            case 'get_hungry':
                switch (state) {
                    case 'busy':
                        this.changeState('hungry')
                        break;
                    case 'sleeping':
                        this.changeState('hungry')
                        break;
                    default:
                        throw new Error
                }
                break;
            case 'eat':
                switch (state) {
                    case 'hungry':
                        this.changeState('normal')
                        break;
                    default:
                        throw new Error
                }
                break;
            case 'get_up':
                switch (state) {
                    case 'sleeping':
                        this.changeState('normal')
                        break;
                    default:
                        throw new Error
                }
                break;
            default:
                throw new Error

        }

        //console.log(this.getState())

    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.states = []
        this.states[0] = this.config.initial
        this.currentPos = 0
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (event === undefined) {
            return ['normal', 'busy', 'hungry', 'sleeping']
        }

        switch (event) {
            case 'study':
                return ['normal']
            case 'get_tired':
                return ['busy']

            case 'get_hungry':
                return ['busy', 'sleeping']
            case 'eat':
                return ['hungry']
            case 'get_up':
                return ['sleeping']
            default:
                return []

        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.currentPos === 0) {
            return false
        }

        console.log('undo')
        console.log(this.currentPos)
        this.currentPos = this.currentPos - 1;

        return true
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if ((this.currentPos === 0 && this.states.length === 1) ||
            ((this.currentPos + 1) >= this.states.length)) {
            return false
        }



        console.log('redo')
        console.log(this.currentPos)
        this.currentPos = this.currentPos + 1;

        return true
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.reset()
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/