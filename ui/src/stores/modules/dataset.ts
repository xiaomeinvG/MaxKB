import { defineStore } from 'pinia'
import type { datasetData } from '@/api/type/dataset'
import type { UploadUserFile } from 'element-plus'
import datasetApi from '@/api/dataset'
import { type Ref } from 'vue'

export interface datasetStateTypes {
  baseInfo: datasetData | null
  webInfo: any
  documentsFiles: UploadUserFile[]
}

const useDatasetStore = defineStore({
  id: 'dataset',
  state: (): datasetStateTypes => ({
    baseInfo: null,
    webInfo: null,
    documentsFiles: []
  }),
  actions: {
    saveBaseInfo(info: datasetData | null) {
      this.baseInfo = info
    },
    saveWebInfo(info: any) {
      this.webInfo = info
    },
    saveDocumentsFile(file: UploadUserFile[]) {
      this.documentsFiles = file
    },
    async asyncGetAllDateset(loading?: Ref<boolean>) {
      return new Promise((resolve, reject) => {
        datasetApi
          .getAllDateset(loading)
          .then((data) => {
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    async asyncGetDatesetDetail(id: string, loading?: Ref<boolean>) {
      return new Promise((resolve, reject) => {
        datasetApi
          .getDatesetDetail(id, loading)
          .then((data) => {
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    async asyncSyncDateset(id: string, sync_type: string, loading?: Ref<boolean>) {
      return new Promise((resolve, reject) => {
        datasetApi
          .putSyncWebDateset(id, sync_type, loading)
          .then((data) => {
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
  }
})

export default useDatasetStore
