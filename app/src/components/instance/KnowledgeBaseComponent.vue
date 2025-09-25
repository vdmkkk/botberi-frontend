<template>
  <div class="kb-container">
    <div class="row justify-between items-center">
      <div class="column">
        <p class="title">База знаний</p>
        <p class="entries-text">Кол-во записей: {{ knowledgeBase?.entries?.length }}</p>
      </div>
      <Button label="Добавить запись" @click="handleAdd" />
    </div>
    <q-virtual-scroll
      style="max-height: 300px"
      :items="knowledgeBase?.entries"
      separator
      v-slot="{ item, index }"
    >
      <q-item :key="index" dense>
        <q-item-section>
          <div class="entry row">
            <ContentIcon v-model:status="item.status" v-model:data-type="item.data_type" />
            <p class="content" @click="clickOnLink(item)">
              {{ maxCharacters(item.content, $q.screen.xs ? 20 : 50) }}
              <q-btn
                v-if="item.data_type != KBDataType.Document && !item.content.includes('s3://')"
                size="xs"
                icon="content_copy"
                round
                flat
                @click.stop="handleCopy(item)"
              />
            </p>
            <q-btn
              class="delete-instance-btn"
              size="sm"
              color="negative"
              icon="delete"
              round
              flat
              @click="handleDelete(item.id)"
            />
          </div>
        </q-item-section>
      </q-item>
    </q-virtual-scroll>
  </div>
</template>

<script setup lang="ts">
import { KBDataType, KBEntryOut, KnowledgeBaseOut } from 'src/api';
import Button from '../Button.vue';
import useDialog from 'src/composables/useDialog';
import { NameDialog } from 'src/dialogs/dialogs';
import { ref, watch } from 'vue';
import useInstances from 'src/api/composables/useInstances';
import ContentIcon from './ContentIcon.vue';
import { Notify, uid, useQuasar } from 'quasar';
import useAssets from 'src/composables/useAssets';

const $q = useQuasar();

const { openDialog, $eventDialog } = useDialog();
const { addKBEntry, deleteKBEntry } = useInstances();
const { getAsset } = useAssets();

const knowledgeBase = defineModel<KnowledgeBaseOut>('knowledgeBase');
const instanceId = defineModel<number>('instance-id');

const maxCharacters = (str: string, num: number) => {
  if (str.includes('s3://')) {
    return maxCharacters(
      str.split('s3://kb-files/')[1]!.split('---')[0]! + '.' + str.split('.').at(-1),
      $q.screen.xs ? 20 : 50,
    );
  }
  if (str.length > num) {
    return str.slice(0, num) + '...';
  }
  return str;
};

const clickOnLink = (entry: KBEntryOut) => {
  if (entry.data_type == KBDataType.Video) {
    window.open(entry.content, '_blank');
  }
  if (entry.data_type == KBDataType.Document) {
    if (entry.content.includes('s3://')) {
      getAsset('kb-files', entry.content.split('s3://kb-files/')[1]!).then((res) => {
        window.open(res, '_blank');
      });
    } else {
      window.open(entry.content, '_blank');
    }
  }
};

const handleCopy = (entry: KBEntryOut) => {
  navigator.clipboard.writeText(entry.content).then(() => {
    Notify.create({
      message: 'Ссылка скопирована в буфер обмена',
      type: 'positive',
      position: 'top',
      timeout: 5000,
    });
  });
};

const confirmId = ref<string>();

const handleAdd = () => {
  openDialog(NameDialog.addEntryDialog);
};

const handleDelete = (entryId: string) => {
  confirmId.value = uid();
  openDialog(NameDialog.confirmActionDialog, {
    actionLabel: 'удалить запись',
    confirmId: confirmId.value,
    meta: { entryId },
  });
};

watch($eventDialog, ({ type, data, nameDialog }) => {
  if (type == 'update' && nameDialog == NameDialog.addEntryDialog) {
    addKBEntry(instanceId.value!, data.data).then((res) => {
      knowledgeBase.value!.entries?.push(res);
    });
  } else if (
    type == 'update' &&
    nameDialog == NameDialog.confirmActionDialog &&
    confirmId.value == data.data.confirmId
  ) {
    deleteKBEntry(instanceId.value!, data.data.meta.entryId).then(() => {
      knowledgeBase.value!.entries = knowledgeBase.value!.entries!.filter(({ id }) => {
        return id !== data.data.meta.entryId;
      });
    });
  }
});
</script>

<style lang="scss" scoped>
.kb-container {
  padding-left: var(--spacing-xs);
  padding-right: var(--spacing-xs);
  .title {
    font-size: var(--font-size-sm);
    font-weight: 600;
    margin-bottom: 0;
  }

  .entries-text {
    color: $font-secondary;
    font-size: var(--font-size-xs);
  }

  .entry {
    gap: var(--spacing-xs);
    align-items: center;
    padding: 4px;

    .content {
      font-size: var(--font-size-sm);
      margin-bottom: 0;
      background-color: $secondary-shade;
      padding: 8px 14px;
      border-radius: 14px;
    }
  }
}

.delete-instance-btn {
  padding: 12px;
  border-radius: 14px !important;
  background-color: $negative-shade;
}

.content:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
