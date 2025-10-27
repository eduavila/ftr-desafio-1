import { useLinks, type Link } from '../store/links'
import { Button } from './ui/button'
import { toast } from 'sonner'
import { Copy, Trash } from 'phosphor-react'

type LinksListItemProps = {
  link: Link
}

export function LinksListItem({ link }: LinksListItemProps) {
  const { updateVisitCount, deleteLink } = useLinks();

  const makeUrlShort = (shortCode: string) => {
    const urlFront = import.meta.env.VITE_FRONTEND_URL;
    const url = `${urlFront}/${shortCode}`;

    return url;
  }

  const onCopyLink = (link: Link) => {
    navigator.clipboard.writeText(makeUrlShort(link.shortCode));

    toast.info("Link copiado com sucesso", {
      description: `O link ${link.shortCode} foi copiado para a área de transferência`,
    });
  }

  const onDeleteLink = async (link: Link) => {
    if (confirm("Tem certeza que deseja deletar este link?")) {
      try {
        await deleteLink(link.id);
      } catch {
        toast.error("Ops. Ocorreu um erro!", {
          description: `Não foi possivel excluir, tente mais tarde!`,
        });
      }
    }
  }

  const onVisitedLink = (link: Link) => {
    updateVisitCount(link.id);

    window.open(makeUrlShort(link.shortCode), '_bank');
  }

  return (
    <li className="py-4 flex items-center justify-between">
      <div className='pr-4'>
        <button onClick={() => onVisitedLink(link)}
          className="text-blue-base text-md font-medium hover:underline">
          brev.ly/{link.shortCode}
        </button>
        <p className="text-sm text-gray-500">{link.originalUrl}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500 whitespace-nowrap">{link.visitCount} acessos</span>

        <Button
          size="icon-sm"
          className="text-xs"
          variant="default"
          onClick={() => onCopyLink(link)}
        >
          <Copy className="text-gray-500" size={16} />
        </Button>

        <Button
          size="icon-sm"
          className="text-xs"
          variant="default"
          onClick={() => onDeleteLink(link)}
        >
          <Trash className="text-gray-500" size={16} />
        </Button>
      </div>
    </li>
  )
}