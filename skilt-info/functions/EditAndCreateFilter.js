export const Metadata = (array, metadata) => {
        if (metadata) {
            array.push({"metadata": true});
        } else {
            array.push({"metadata": false});
        }
    };

export const GeometriPunkt = (array, geometriPunkt) => {
    };

export const Skiltnummer = (array, skiltnummer) => {
        if (skiltnummer) {
            array.push({"Skiltnummer": true})
        } else {
            array.push({"Skiltnummer": false})
        }
    };

export const AnsiktssideRettetMot = (array, ansikt) => {
        if (ansikt) {
            array.push({"Ansiktsside": true})
        } else {
            array.push({"Ansiktsside": false})
        }
    };


export const Oppsettingsdato = (array, oppsettingsdato) => {
    };
