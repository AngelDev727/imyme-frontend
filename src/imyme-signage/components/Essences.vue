<template>
    <div class="essence-section mt-3">
        <Essence
            v-for="val in essenceList"
            :key="Object.keys(val)[0]"
            :essence-id="Object.keys(val)[0]"
            :essence-image="Object.values(val)[0]"
            class="essence-top-page"
        />
    </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import Essence from '@signage/components/Essence.vue'

@Component({
    components: {
        Essence,
    },
})
export default class Essences extends Vue {
    public name: string = 'Essences'

    essenceList = [
        {'19': 'https://imymestorage.blob.core.windows.net/images/6b9ac79a-7688-4067-9953-f97344f4d37f'},
        {'119': 'https://imymestorage.blob.core.windows.net/images/ed94abc4-44b3-40d6-9577-07701ab5cdf3'},
        {'137': 'https://imymestorage.blob.core.windows.net/images/af66bc8f-98b0-4819-89ce-7a225273bb76'},
        {'74': 'https://imymestorage.blob.core.windows.net/images/6e5b9ea0-01c1-40f9-8f67-da28326f4e19'},
        {'18': 'https://imymestorage.blob.core.windows.net/images/d43d9f25-4d1e-4562-8e33-47ade56a118b'},
        {'50': 'https://imymestorage.blob.core.windows.net/images/6369932b-4340-4385-8c44-f09419c37ce9'},
        {'162': 'https://imymestorage.blob.core.windows.net/images/e05616b6-f26a-4239-a803-0754d66112b3'},
        {'132': 'https://imymestorage.blob.core.windows.net/images/9b5079c3-44a9-4162-9e46-7c4e78d87702'},
        {'133': 'https://imymestorage.blob.core.windows.net/images/d2b34975-ea0c-44b0-a204-cc00acb80806'},
        {'118': 'https://imymestorage.blob.core.windows.net/images/4aed7ea1-30dc-4b7c-af4c-3e9a8a216c6c'},
        {'166': 'https://imymestorage.blob.core.windows.net/images/3b00d7c5-25a2-49a7-9b50-af06344392c3'},
        {'134': 'https://imymestorage.blob.core.windows.net/images/bfefe9b6-7324-4d93-8640-eb1d09487297'},
        {'79': 'https://imymestorage.blob.core.windows.net/images/bfefe9b6-7324-4d93-8640-eb1d09487297'},

        {'135': 'https://imymestorage.blob.core.windows.net/images/6b6858f6-966d-4d65-9ae4-a9ba8e6e7602'},
        {'58': 'https://imymestorage.blob.core.windows.net/images/de5c0fc8-ed59-4803-9647-6a03bda226af'},
        {'136': 'https://imymestorage.blob.core.windows.net/images/b167cc22-1f35-43ba-9d2d-bfd2afa7ca36'},
        {'53': 'https://imymestorage.blob.core.windows.net/images/3ebf213b-4a6f-4c37-b0ee-4d6d6a627e1e'},
        {'22': 'https://imymestorage.blob.core.windows.net/images/e14add9a-6170-426b-afc4-e51b872ffd2f'},
        {'156': 'https://imymestorage.blob.core.windows.net/images/1cc2aa7e-809c-433d-b1d4-5e436cccff3c'},
        {'61': 'https://imymestorage.blob.core.windows.net/images/271ec604-7f7b-460f-9568-17755862f6a7'},
        {'165': 'https://imymestorage.blob.core.windows.net/images/5dd515f1-35c8-48c1-822c-40fa1886ba70'},
        {'108': 'https://imymestorage.blob.core.windows.net/images/8e2caef8-c421-4803-ab1f-5fab54c9e105'},
        {'23': 'https://imymestorage.blob.core.windows.net/images/f4868f6f-2677-4303-b493-60e4a1106ea9'},
        {'141': 'https://imymestorage.blob.core.windows.net/images/5464e4cc-1ebd-42f2-9cc2-e3062fbd8399'},
        {'78': 'https://imymestorage.blob.core.windows.net/images/255524b1-751c-4d84-b181-ff2aea216b12'},
        {'101': 'https://imymestorage.blob.core.windows.net/images/bfefe9b6-7324-4d93-8640-eb1d09487297'},

        {'93': 'https://imymestorage.blob.core.windows.net/images/7dff6b1f-0c55-4447-b042-534988eb6953'},
        {'77': 'https://imymestorage.blob.core.windows.net/images/665cdb8f-053f-43bd-a225-7fb33da24a32'},
        {'110': 'https://imymestorage.blob.core.windows.net/images/7514b56a-75c1-4738-a058-f6c863f716fb'},
        {'104': 'https://imymestorage.blob.core.windows.net/images/ab84147d-288a-40a7-8549-2ffc391dabfa'},
        {'107': 'https://imymestorage.blob.core.windows.net/images/cae908ca-e0ff-45ec-977a-ff95fdb6509c'},
        {'160': 'https://imymestorage.blob.core.windows.net/images/475400d8-9a7e-4346-b85f-d1022f838ca1'},
        {'51': 'https://imymestorage.blob.core.windows.net/images/de7d991a-6017-49ad-beb4-cce93394c483'},
        {'97': 'https://imymestorage.blob.core.windows.net/images/d3b3b2cd-3c13-45e3-8dc1-0af1b55bc051'},
        {'73': 'https://imymestorage.blob.core.windows.net/images/748836ba-00fe-4d7c-90a2-e7aef0bae5db'},
        {'155': 'https://imymestorage.blob.core.windows.net/images/6203b312-8e60-4b42-ab10-d99627a19d9a'},
        {'20': 'https://imymestorage.blob.core.windows.net/images/358f8e06-00a4-4b3b-ae9e-1c0111bb843b'},
        {'99': 'https://imymestorage.blob.core.windows.net/images/bfefe9b6-7324-4d93-8640-eb1d09487297'},
        {'117': 'https://imymestorage.blob.core.windows.net/images/bfefe9b6-7324-4d93-8640-eb1d09487297'},

        {'114': 'https://imymestorage.blob.core.windows.net/images/1dce3d99-4cc6-4392-89c7-468b527d908d'},
        {'157': 'https://imymestorage.blob.core.windows.net/images/fd289913-40e0-4903-a47c-c3459fa4f657'},
        {'139': 'https://imymestorage.blob.core.windows.net/images/2dd20030-6fee-41e5-988e-66746945011c'},
        {'63': 'https://imymestorage.blob.core.windows.net/images/43776795-332e-4045-97ba-0ef73e740d6c'},
        {'167': 'https://imymestorage.blob.core.windows.net/images/e4b424a4-92e6-4811-83b5-d03abd954ae2'},
        {'142': 'https://imymestorage.blob.core.windows.net/images/fa142c18-5ddd-4f88-8f44-25cd754be828'},
        {'72': 'https://imymestorage.blob.core.windows.net/images/08969505-b01b-41f5-9336-beb2c1152244'},
        {'95': 'https://imymestorage.blob.core.windows.net/images/14ebea19-75f0-437a-8598-3db59275f5a1'},
        {'158': 'https://imymestorage.blob.core.windows.net/images/2198d088-fada-4b8a-88b2-32b27d46cf92'},
        {'14': 'https://imymestorage.blob.core.windows.net/images/df0a1d3b-a1ca-4495-8e35-81559b1196f5'},
        {'90': 'https://imymestorage.blob.core.windows.net/images/9b7bdee4-40a8-4ae2-8ab1-df03f4fd5ee6'},
        {'68': 'https://imymestorage.blob.core.windows.net/images/a3f506c1-909a-4c62-ada3-890b7dcbe8a6'},
        {'100': 'https://imymestorage.blob.core.windows.net/images/bfefe9b6-7324-4d93-8640-eb1d09487297'},

        {'159': 'https://imymebackendstorage.blob.core.windows.net/essences-dev/14438743-b7e4-430d-b1f4-d0795d1fa40c'},
        {'161': 'https://imymestorage.blob.core.windows.net/images/d792ba3b-3604-41c3-98d6-ae6a900a2795'},
        {'143': 'https://imymestorage.blob.core.windows.net/images/0e10cd62-692a-4388-9b68-7f57756d7364'},
        {'109': 'https://imymestorage.blob.core.windows.net/images/e14ed413-ba50-4569-a5a9-bee2849cf189'},
        {'138': 'https://imymestorage.blob.core.windows.net/images/dadb998a-d379-4f5c-a909-c5958553d849'},
        {'48': 'https://imymestorage.blob.core.windows.net/images/a3f506c1-909a-4c62-ada3-890b7dcbe8a6'},
        {'112': 'https://imymestorage.blob.core.windows.net/images/d6b74dbf-9c24-4caa-8648-a018af69174c'},
        {'62': 'https://imymestorage.blob.core.windows.net/images/070f5fd3-8e23-419e-9603-a41fa8beda7c'},
        {'80': 'https://imymestorage.blob.core.windows.net/images/2587a7fd-9da3-4101-a6f3-084a56367ed7'},
        {'140': 'https://imymestorage.blob.core.windows.net/images/b1834d56-0204-4b9e-8099-7bfdde5bc95b'},
        {'83': 'https://imymestorage.blob.core.windows.net/images/976e2cf4-1eac-4bcf-b6ba-9ff196c36f77'},
        {'96': 'https://imymestorage.blob.core.windows.net/images/bfefe9b6-7324-4d93-8640-eb1d09487297'},
        {'126': 'https://imymestorage.blob.core.windows.net/images/bfefe9b6-7324-4d93-8640-eb1d09487297'},
    ];
}
</script>
